"use client";
import styles from "./Auth.module.css";

export default function AuthLayout({ children }) {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.logoContainer}>
        <img src="/icons/loginpage.svg" alt="Corporate Professionals" className={styles.logo} />
      </div>
      <div className={styles.authCard}>
        {children}
      </div>
    </div>
  );
}
