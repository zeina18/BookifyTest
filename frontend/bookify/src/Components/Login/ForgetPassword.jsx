import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import style from "./ForgetPassword.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
            
      setMessage("If an account exists with this email, you'll receive a password reset link shortly.");
      setEmail("");
    } catch (err) {
      setError(err.message || "Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className={style.passwordCard}>
          <div className={style.illustration}>
            <div>
              <h2>Reset Your Password</h2>
              <p>Enter your email to receive a reset link</p>
            </div>
          </div>
          
          <div className={style.formSection}>
            <h1 className={style.header}>Forgot Password?</h1>
            <form onSubmit={handleSubmit}>
              <div className={style.formGroup}>
                <label htmlFor="email" className={style.label}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  className={style.input}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {message && <div className={style.success}>{message}</div>}
              {error && <div className={style.error}>{error}</div>}
              
              <button 
                type="submit" 
                className={style.submitBtn}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "SEND RESET LINK"}
              </button>
              
              <div className={style.loginLink}>
                Remember your password? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}