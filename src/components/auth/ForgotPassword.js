"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import styles from "./Auth.module.css";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup/resend-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, flow_type: "forgot" }),
        });
        
        if (!res.ok) {
          let errorMessage = "Failed to resend OTP";
          try {
            const data = await res.json();
            errorMessage = data.detail || data.message || errorMessage;
          } catch (e) {
            if (res.status === 404) errorMessage = "Requested service not found (404)";
          }
          throw new Error(errorMessage);
        }
        
        toast.success("OTP sent successfully!");
        setCountdown(30);
        setCanResend(false);
        console.log("Resending OTP...");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInitiate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, flow_type: "forgot" }),
      });
      
      if (!res.ok) {
        let errorMessage = "Failed to initiate password reset";
        try {
          const data = await res.json();
          errorMessage = data.detail || data.message || errorMessage;
        } catch (e) {
          if (res.status === 404) errorMessage = "User or service not found (404)";
        }
        throw new Error(errorMessage);
      }
      
      toast.success("Verification code sent!");
      setStep(2);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      
      if (!res.ok) {
        let errorMessage = "Invalid OTP";
        try {
          const data = await res.json();
          errorMessage = data.detail || data.message || errorMessage;
        } catch (e) {
          if (res.status === 404) errorMessage = "Verification service not found (404)";
        }
        throw new Error(errorMessage);
      }
      
      toast.success("OTP verified!");
      setStep(3);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup/generate-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPassword, confirm_password: confirmPassword }),
      });
      
      if (!res.ok) {
        let errorMessage = "Failed to reset password";
        try {
          const data = await res.json();
          errorMessage = data.detail || data.message || errorMessage;
        } catch (e) {
          if (res.status === 404) errorMessage = "Reset service not found (404)";
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      // Store token
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Set cookie for middleware
        document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      }

      console.log("Password reset success:", data);
      toast.success("Password reset successful!");
      window.location.href = "/";
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {(step === 1 || step === 2) && (
        <>
          <h1 className={styles.title}>Forgot password</h1>
          <p className={styles.subtitle}>Enter your registered email and we will send you a link to reset your password.</p>
          
          <form onSubmit={step === 1 ? handleInitiate : handleVerifyOTP}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                placeholder="m@example"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={step === 2}
              />
            </div>

            {step === 2 && (
              <div className={styles.formGroup}>
                <div className={styles.otpRow}>
                  <label className={styles.label}>OTP</label>
                  <button 
                    type="button" 
                    className={styles.resendBtn} 
                    onClick={handleResendOTP}
                    disabled={!canResend}
                  >
                    {canResend ? "Resend OTP" : `Resend in ${countdown}s`}
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
            )}
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Processing..." : "Continue"}
            </button>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className={styles.title}>Reset your password</h1>
          <p className={styles.subtitle}>Enter a new password below to change your password.</p>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>New Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`${styles.input} ${styles.passwordInput}`}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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



            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Updating..." : "Continue"}
            </button>
          </form>
        </>
      )}

      <p className={styles.footerText}>
        Back to <Link href="/login">Login</Link>
      </p>
    </>
  );
}
