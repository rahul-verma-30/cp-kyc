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
  const [loading, setLoading] = useState(false);

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

  const handleResendOTP = async () => {
    if (canResend) {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup/resend-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, flow_type: "signup" }),
        });
        if (!res.ok) throw new Error("Failed to resend OTP");
        
        setCountdown(30);
        setCanResend(false);
        console.log("Resending OTP...");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInitiate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, flow_type: "signup" }),
      });
      if (!res.ok) throw new Error("Failed to initiate signup");
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (!res.ok) throw new Error("Invalid OTP");
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup/generate-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirm_password: confirmPassword }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      // Store token
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      console.log("Signup success:", data);
      // Redirect or show success
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {step === 1 && (
        <>
          <h1 className={styles.title}>Sign Up</h1>
          <p className={styles.subtitle}>Enter your email below to create your account</p>
          <form onSubmit={handleInitiate}>
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
            {error && step === 1 && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Processing..." : "Verify Account"}
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
          <form onSubmit={handleVerifyOTP}>
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
            {error && step === 2 && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Verifying..." : "Continue"}
            </button>
             <button type="button" className={styles.linkButton} onClick={handleBack} disabled={loading}>
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
            {error && step === 3 && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </>
      )}
    </>
  );
}
