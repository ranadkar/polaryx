import uvicorn
import asyncio
import re
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from search_news import search_news
from scrapers.cnn import fetch_cnn
from scrapers.fox import fetch_fox
from openai import OpenAI
from dotenv import load_dotenv
from reddit_sentiment import search_reddit
import asyncpraw
import os

load_dotenv()


def strip_html_tags(text: str) -> str:
    """Remove HTML tags from text."""
    if not text:
        return text
    # Remove HTML tags
    clean_text = re.sub(r'<[^>]+>', '', text)
    # Normalize all whitespace (spaces, newlines, tabs, etc.) to single spaces
    clean_text = re.sub(r'\s+', ' ', clean_text)
    # Clean up extra whitespace at start/end
    clean_text = clean_text.strip()
    return clean_text


def to_epoch_time(iso_timestamp: str) -> int:
    """Convert ISO 8601 UTC timestamp to epoch time."""
    if not iso_timestamp:
        return 0
    # Parse ISO 8601 format like "2026-01-16T22:36:55Z"
    dt = datetime.fromisoformat(iso_timestamp.replace('Z', '+00:00'))
    return int(dt.timestamp())


client = OpenAI()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

reddit = asyncpraw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT"),
)


async def classify_bias(title: str, content: str) -> str:
    """Use OpenAI to classify political bias of a post as 'left' or 'right'."""
    try:
        prompt = f"""Analyze the political bias of this social media post. Classify it as either 'left' (liberal/progressive) or 'right' (conservative).

Title: {title}
Content: {content[:500]}

Respond with ONLY one word: either 'left' or 'right'."""

        response = await asyncio.to_thread(
            client.chat.completions.create,
            model="gpt-5-nano",
            messages=[{"role": "user", "content": prompt}],
        )

        bias = response.choices[0].message.content.strip().lower()
        return bias if bias in ["left", "right"] else "neutral"
    except Exception as e:
        print(f"Error classifying bias: {e}")
        return "neutral"


@app.get("/")
async def root():
    return {"message": "goon"}


@app.get("/search")
async def search(q: str):
    # Run news search and Reddit search in parallel
    news_task = asyncio.create_task(
        asyncio.to_thread(search_news, q, "cnn.com, foxnews.com")
    )
    reddit_task = asyncio.create_task(search_reddit(reddit, q, "all", limit=10))
    
    # Wait for both to complete
    news_results, reddit_posts = await asyncio.gather(news_task, reddit_task)

    results = news_results["articles"]
    outputs = []
    cnn_count = 0
    fox_count = 0

    for article in results:
        if len(outputs) >= 20:
            break

        if "cnn.com" in article["url"]:
            if cnn_count >= 5:
                continue
            content = fetch_cnn(article["url"])
            source = "CNN"
            bias = "left"
            cnn_count += 1
        elif "foxnews.com" in article["url"]:
            if fox_count >= 5:
                continue
            content = fetch_fox(article["url"])
            source = "Fox"
            bias = "right"
            fox_count += 1
        else:
            continue

        output = {
            "source": source,
            "title": article["title"],
            "url": article["url"],
            "contents": strip_html_tags(article["content"]),
            "bias": bias,
            # "sentiment_score": TODO,
            "author": article["author"],
            "date": to_epoch_time(article["publishedAt"]),
        }
        outputs.append(output)

    # Classify bias for Reddit posts using Gemini
    bias_tasks = [
        classify_bias(post["title"], post.get("contents", "")) for post in reddit_posts
    ]
    biases = await asyncio.gather(*bias_tasks)

    # Add bias to each Reddit post
    for post, bias in zip(reddit_posts, biases):
        post["bias"] = bias

    # Add Reddit posts to outputs
    outputs.extend(reddit_posts)

    return outputs


if __name__ == "__main__":
    uvicorn.run("server:app")
