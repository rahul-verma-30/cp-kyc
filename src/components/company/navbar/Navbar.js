import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img
          src="/icons/company-logo.svg"
          alt="Corporate Professionals Logo"
          className={styles.logo}
        />
      </div>

      <div className={styles.navLinks}>
        <Link href="/history">Talk With Sales</Link>
        <Link href="/sales">Pricing</Link>
      </div>

      <div className={styles.authActions}>
        <Link href="/login" className={styles.login}>
          Log in
        </Link>
        <button className={styles.trialButton}>
          Start Free Trial
          <img
            src="/icons/arrow_tilt.svg"
            alt="arrow"
            className={styles.arrow}
          />
        </button>
      </div>
    </nav>
  );
}
