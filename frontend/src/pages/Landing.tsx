import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNav from '../components/LandingNav';
import { useAppDispatch, useAppSelector } from '../lib/store';
import { runSearch, setQuery } from '../lib/searchSlice';
import styles from '../styles/Landing.module.scss';

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector((state) => state.search);
  const isLoading = status === 'loading';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(runSearch(query));
      navigate('/loading');
    }
  };

  return (
    <div className={styles.landing}>
      <LandingNav />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection} id="demo">
          <div className={styles.gridBgDark}></div>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeDotRed}></span>
              <span className={styles.badgeDotBlue}></span>
              <span className={styles.badgeText}>Bipartisan Analysis Engine</span>
            </div>
            <h1 className={styles.heroTitle}>
              Democratizing Insight in a <span className={styles.heroTitleItalic}>Divided</span> Information Age
            </h1>
            <p className={styles.heroSubtitle}>
              AI-powered sentiment analysis and bias classification to decode political discourse, revealing how different perspectives frame the same issues.
            </p>
            <div className={styles.searchBox}>
              <form className={styles.searchForm} onSubmit={handleSubmit}>
                <div className={styles.searchInputWrapper}>
                  <div className={styles.searchIcon}>
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className={styles.searchInput}
                    placeholder="Enter a topic (e.g. NATO Funding, Tax Policy)"
                    type="text"
                    value={query}
                    onChange={(e) => dispatch(setQuery(e.target.value))}
                  />
                </div>
                <button
                  className={styles.searchButton}
                  type="submit"
                  disabled={isLoading || !query.trim()}
                >
                  <span className={styles.searchButtonText}>
                    {isLoading ? 'Analyzing...' : 'Analyze Discussion'}
                  </span>
                  <span className="material-symbols-outlined">analytics</span>
                </button>
              </form>
              <div className={styles.searchMeta}>
                <div className={styles.statusIndicator}>
                  <span className={styles.statusDot}></span>
                  <span>System Active</span>
                </div>
                <div className={styles.dataSource}>
                  <span className="material-symbols-outlined">database</span>
                  <span>Reddit / BlueSky / NewsAPI</span>
                </div>
                <div className={styles.nodeTags}>
                  <span className={styles.nodeTagBlue}>LIB_NODES</span>
                  <span className={styles.nodeTagRed}>CON_NODES</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Liberal/Methodology Section */}
        <section className={styles.methodologySection} id="methodology">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionGrid}>
              <div className={`${styles.contentWrapper} ${styles.contentOrder2}`}>
                <div className={styles.sectionLabel}>
                  <span className={`${styles.sectionLabelText} ${styles.sectionLabelBlue}`}>01 — Discourse Mapping</span>
                  <div className={`${styles.sectionLabelLine} ${styles.sectionLabelLineBlue}`}></div>
                </div>
                <h2 className={styles.sectionTitle}>Compare Political Bases</h2>
                <p className={styles.sectionDescription}>
                  Our engine visualizes the distinct narrative landscapes of modern politics. We identify and separate conservative and liberal clusters sourced directly from major news and social media outlets.
                </p>
                <div className={styles.featureCards}>
                  <div className={`${styles.featureCard} ${styles.featureCardBlue}`}>
                    <h4 className={styles.featureCardTitle}>Multi-Platform Aggregation</h4>
                    <p className={styles.featureCardDesc}>Real-time search across Reddit, Bluesky, and major news outlets to capture diverse political perspectives on any topic.</p>
                  </div>
                  <div className={`${styles.featureCard} ${styles.featureCardBlue}`}>
                    <h4 className={styles.featureCardTitle}>Bias Classification</h4>
                    <p className={styles.featureCardDesc}>Machine learning models automatically identify political leaning of each source to separate liberal and conservative viewpoints.</p>
                  </div>
                </div>
              </div>
              <div className={`${styles.contentOrder1}`}>
                <div className={styles.comparisonCard}>
                  <div className={styles.comparisonInner}>
                    <div className={styles.comparisonHeader}>
                      <div className={styles.comparisonLabel}>BASE_COMPARISON_V1</div>
                      <span className={`material-symbols-outlined ${styles.comparisonIcon}`}>groups</span>
                    </div>
                    <div className={styles.comparisonSvgWrapper}>
                      <svg className={styles.comparisonSvg} viewBox="0 0 200 200">
                        <circle cx="70" cy="100" fill="#3B82F6" fillOpacity="0.1" r="50"></circle>
                        <circle cx="70" cy="100" fill="none" r="50" stroke="#3B82F6" strokeDasharray="2 2" strokeWidth="0.5"></circle>
                        <circle cx="130" cy="100" fill="#EF4444" fillOpacity="0.1" r="50"></circle>
                        <circle cx="130" cy="100" fill="none" r="50" stroke="#EF4444" strokeDasharray="2 2" strokeWidth="0.5"></circle>
                        <g style={{ color: '#3B82F6' }}>
                          <circle cx="50" cy="80" fill="currentColor" r="4"></circle>
                          <circle cx="80" cy="110" fill="currentColor" r="5"></circle>
                          <circle cx="60" cy="120" fill="currentColor" r="3"></circle>
                        </g>
                        <g style={{ color: '#EF4444' }}>
                          <circle cx="150" cy="80" fill="currentColor" r="4"></circle>
                          <circle cx="120" cy="110" fill="currentColor" r="5"></circle>
                          <circle cx="140" cy="120" fill="currentColor" r="3"></circle>
                        </g>
                        <line opacity="0.3" stroke="#94A3B8" strokeWidth="0.5" x1="80" x2="120" y1="110" y2="110"></line>
                      </svg>
                    </div>
                    <div className={styles.comparisonFooter}>
                      <div className={styles.comparisonBars}>
                        <div className={styles.comparisonBarBlue}></div>
                        <div className={styles.comparisonBarRed}></div>
                      </div>
                      <div className={styles.comparisonLabels}>
                        <span>LIBERAL CLUSTERS</span>
                        <span>CONSERVATIVE CLUSTERS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conservative Section */}
        <section className={styles.conservativeSection} id="conservative">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionGrid}>
              <div>
                <div className={`${styles.visualizationCard} ${styles.visualizationCardRed}`}>
                  <div className={`${styles.visualizationInner} ${styles.visualizationInnerRed}`}>
                    <div className={styles.visualizationHeader}>
                      <div className={`${styles.datasetLabel} ${styles.datasetLabelRed}`}>MEDIA_SYNTHESIS_HUB</div>
                      <span className={`material-symbols-outlined ${styles.visualizationIconRed}`}>satellite_alt</span>
                    </div>
                    <div className={styles.visualizationSvgWrapper}>
                      <svg className={styles.visualizationSvg} viewBox="0 0 200 200">
                        <rect fill="none" height="160" stroke="#EF4444" strokeDasharray="4 4" strokeWidth="0.5" width="160" x="20" y="20"></rect>
                        <rect fill="#EF4444" fillOpacity="0.1" height="30" rx="4" width="80" x="60" y="40"></rect>
                        <text fill="#EF4444" fontFamily="sans-serif" fontSize="8" fontWeight="bold" x="78" y="58">FOX NEWS</text>
                        <rect fill="#3B82F6" fillOpacity="0.1" height="30" rx="4" width="80" x="60" y="85"></rect>
                        <text fill="#3B82F6" fontFamily="sans-serif" fontSize="8" fontWeight="bold" x="88" y="103">CNN</text>
                        <rect fill="#10B981" fillOpacity="0.1" height="30" rx="4" width="80" x="60" y="130"></rect>
                        <text fill="#10B981" fontFamily="sans-serif" fontSize="8" fontWeight="bold" x="82" y="148">REDDIT</text>
                        <line opacity="0.3" stroke="#334155" strokeWidth="1" x1="140" x2="160" y1="55" y2="100"></line>
                        <line opacity="0.3" stroke="#334155" strokeWidth="1" x1="140" x2="160" y1="145" y2="100"></line>
                        <circle cx="160" cy="100" fill="#334155" r="3"></circle>
                      </svg>
                    </div>
                    <div className={styles.integrationBar}>
                      <div className={styles.integrationBarTrack}>
                        <div className={styles.integrationBarFill}></div>
                      </div>
                      <div className={styles.integrationLabels}>
                        <span>SOURCE INTEGRATION</span>
                        <span>LIVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.contentWrapper}>
                <div className={styles.sectionLabel}>
                  <span className={`${styles.sectionLabelText} ${styles.sectionLabelRed}`}>02 — Data Integration</span>
                  <div className={`${styles.sectionLabelLine} ${styles.sectionLabelLineRed}`}></div>
                </div>
                <h2 className={styles.sectionTitle}>Cross-Media Synthesis</h2>
                <p className={styles.sectionDescription}>
                  We analyze discourse from various political perspectives across Reddit, Bluesky, and news outlets. Our AI identifies emotional patterns and narrative differences, filtering high-quality content to reveal how each side frames the debate.
                </p>
                <div className={styles.featureCards}>
                  <div className={`${styles.featureCard} ${styles.featureCardRed}`}>
                    <h4 className={styles.featureCardTitle}>Sentiment Analysis</h4>
                    <p className={styles.featureCardDesc}>Advanced NLP algorithms measure emotional tone and intensity across thousands of posts to reveal underlying attitudes.</p>
                  </div>
                  <div className={`${styles.featureCard} ${styles.featureCardRed}`}>
                    <h4 className={styles.featureCardTitle}>AI-Generated Insights</h4>
                    <p className={styles.featureCardDesc}>GPT-powered analysis extracts key takeaways from each political perspective and identifies areas of common ground.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge/Verification Section */}
        <section className={styles.challengeSection} id="challenge">
          <div className={`${styles.sectionContainer} ${styles.challengeSectionContainer}`}>
            <div className={styles.sectionGrid}>
              <div>
                <div className={styles.challengeCard}>
                  <div className={styles.challengeCardGlow}></div>
                  <div className={styles.challengeCardContent}>
                    <div className={styles.challengeRow}>
                      <div className={`${styles.challengeIcon} ${styles.challengeIconWarning}`}>
                        <span className="material-symbols-outlined">report_problem</span>
                      </div>
                      <div className={`${styles.challengeQuote} ${styles.challengeQuoteWarning}`}>
                        "The proposed regulation will eliminate 15% of total manufacturing jobs by Q4."
                      </div>
                    </div>
                    <div className={styles.challengeArrow}>
                      <div className={`${styles.challengeArrowLine} ${styles.challengeArrowLineTop}`}></div>
                      <div className={styles.challengeArrowLabel}>Polaryx Verification</div>
                      <div className={`${styles.challengeArrowLine} ${styles.challengeArrowLineBottom}`}></div>
                    </div>
                    <div className={styles.challengeRow}>
                      <div className={`${styles.challengeIcon} ${styles.challengeIconSuccess}`}>
                        <span className="material-symbols-outlined">fact_check</span>
                      </div>
                      <div className={`${styles.challengeQuote} ${styles.challengeQuoteSuccess}`}>
                        <span className={styles.challengeQuoteLabel}>Context Verified:</span> BLS projections show a potential 0.8% shift, primarily through attrition. Job loss claims are statistically unverified.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.contentWrapper}>
                <div className={styles.sectionLabel}>
                  <span className={`${styles.sectionLabelText} ${styles.sectionLabelMuted}`}>03 — AI Analysis</span>
                  <div className={`${styles.sectionLabelLine} ${styles.sectionLabelLineMuted}`}></div>
                </div>
                <h2 className={styles.sectionTitle}>Intelligent Context & Common Ground</h2>
                <p className={styles.sectionDescription}>
                  Our AI assistant analyzes all collected articles to extract key takeaways from each perspective and identify areas of shared concern. Ask questions and get contextualized answers grounded in the actual discourse.
                </p>
                {/* <button className={styles.viewProtocolButton}>
                  View Verification Protocol
                  <span className="material-symbols-outlined">arrow_right_alt</span>
                </button> */}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <span className="material-symbols-outlined">balance</span>
                <span className={styles.footerLogoText}>Polaryx.</span>
              </div>
              <p className={styles.footerTagline}>
                An advanced analytical framework for the modern citizen. We believe that clarity in disagreement is the first step toward national health.
              </p>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span className={styles.footerBuilt}>
              Built for Clarity <span className={styles.footerDot}></span> Santa Cruz, CA.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
