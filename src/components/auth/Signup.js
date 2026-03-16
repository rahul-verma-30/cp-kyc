"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Auth.module.css";

export default function Signup() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleResendOTP = () => {
    if (canResend) {
      setCountdown(30);
      setCanResend(false);
      console.log("Resending OTP...");
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Signup with:", email, otp, password);
    // Logic for final signup
  };

  return (
    <>
      {step === 1 && (
        <>
          <h1 className={styles.title}>Sign Up</h1>
          <p className={styles.subtitle}>Enter your email below to create your account</p>
          <form onSubmit={handleNext}>
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
            <button type="submit" className={styles.submitBtn}>
              Verify Account
            </button>
          </form>
          <p className={styles.footerText}>
            Already having an account? <Link href="/login">Login</Link>
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className={styles.title}>Verification</h1>
          <p className={styles.subtitle}>Enter the verification code we sent to {email}</p>
          <form onSubmit={handleNext}>
            <div className={styles.formGroup}>
              <div className={styles.otpRow}>
                  <label className={styles.label}>OTP</label>
                  <button 
                    type="button" 
                    className={styles.resendBtn} 
                    onClick={handleResendOTP}
                    disabled={!canResend}
                  >
                    {canResend ? "Resend OTP" :  `Resend in ${countdown}s` }
                  </button>
                </div>
              <input
                type="text"
                placeholder="Enter the OTP"
                className={styles.input}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className={styles.submitBtn}>
              Continue
            </button>
             <button type="button" className={styles.linkButton} onClick={handleBack}>
              <img src="/icons/chevron-left.svg" alt="" />
              Back
            </button>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className={styles.title}>Create password</h1>
          <p className={styles.subtitle}>Set up a secure password</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
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
            <div className={styles.formGroup}>
              <label className={styles.label}>Confirm password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`${styles.input} ${styles.passwordInput}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeIcon}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img src={showConfirmPassword ? "/icons/eye-open.svg" : "/icons/eye-off.svg"} alt="toggle visibility" />
                </button>
              </div>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitBtn}>
              Sign Up
            </button>
          </form>
        </>
      )}
    </>
  );
}
