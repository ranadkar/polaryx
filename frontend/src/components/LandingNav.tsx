import ThemeToggle from './ThemeToggle';
import styles from '../styles/LandingNav.module.scss';
import { useNavigate } from 'react-router-dom';

const LandingNav = () => {
    const navigate = useNavigate();

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logoWrapper}>
                    <div className={styles.logoIcon} onClick={() => navigate('/')}>
                        <span className="material-symbols-outlined">balance</span>
                    </div>
                    <span className={styles.logoText} onClick={() => navigate('/')}>Polaryx.</span>
                </div>
                <nav className={styles.nav}>
                    <a className={styles.navLink} href="#methodology" onClick={(e) => scrollToSection(e, 'methodology')}>Discourse Mapping</a>
                    <a className={styles.navLink} href="#conservative" onClick={(e) => scrollToSection(e, 'conservative')}>Data Synthesis</a>
                    <a className={styles.navLink} href="#challenge" onClick={(e) => scrollToSection(e, 'challenge')}>AI Insights</a>
                </nav>
                <div className={styles.actions}>
                    <ThemeToggle />
                    <button className={styles.mobileMenuButton}>
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default LandingNav;
