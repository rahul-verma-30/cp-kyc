"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Auth.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login with:", email, password);
    // Logic for login
  };

  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.subtitle}>Enter your email below to login to your account</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            placeholder="m@example"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelRow}>
            <label className={styles.label}>Password</label>
            <Link href="/forgot-password" className={styles.forgotLink}>
              Forgot your password?
            </Link>
          </div>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={`${styles.input} ${styles.passwordInput}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={showPassword ? "/icons/eye-open.svg" : "/icons/eye-off.svg"} alt="toggle visibility" />
            </button>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
      </form>

      <p className={styles.footerText}>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </>
  );
}
