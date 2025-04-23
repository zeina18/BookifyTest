import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";
import style from "./Login.module.css";
import { useAuth } from "../context/Auth/AuthContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.jsx";
import { ArrowLeft } from "lucide-react"; // Import ArrowLeft icon

export default function Login() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    
    if (!response.ok) {
      setError("Incorrect Email or Password! Please try again.");
      return;
    }

    const token = await response.json();

    if (!token) {
      setError("Incorrect Token");
      return;
    }

    login(email, token);
    navigate("/");
  };

  const handleBackClick = () => {
    navigate('/'); // Navigate back to home page
  };

  return (
    <>
      <Navbar />
      <div className={style.container}>
        {/* Back Button */}
        

        <div className={style.loginCard}>
          <div className={style.illustration}>
            <div>
              <h2>Welcome Back!</h2>
            </div>
          </div>
          
          <div className={style.formSection}>
          <div >
          <button 
            className={style.backButton}
            onClick={handleBackClick}
            aria-label="Back to Home"
          >
            <ArrowLeft className={style.backIcon} />
          </button>
        </div>
            <h1 className={style.header}>LOGIN</h1>            
            <form onSubmit={onSubmit}>
              <div className={style.formGroup}>
                <label htmlFor="email" className={style.label}>Email Address</label>
                <div className={style.inputContainer}>
                  <input
                    type="email"
                    id="email"
                    className={style.input}
                    placeholder="Enter your email"
                    ref={emailRef}
                    required
                  />
                </div>
              </div>
              
              <div className={style.formGroup}>
                <label htmlFor="password" className={style.label}>Password</label>
                <div className={style.passwordInputContainer}>
                  <div className={style.inputWrapper}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={style.input}
                      placeholder="Enter your password"
                      ref={passwordRef}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className={style.showPasswordButton}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/forget-password" className={style.forgotPassword}>
                  Forgot Password?
                </Link>
              </div>
               
              {error && <div className={style.error}>{error}</div>}
              
              <button type="submit" className={style.submitBtn}>
                LOGIN
              </button>
              
              <div className={style.signupLink}>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}