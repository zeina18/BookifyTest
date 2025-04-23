import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "./SignUp.module.css";
import Footer from "../Footer/Footer";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import Navbar from "../Navbar/Navbar";
import { ArrowLeft } from "lucide-react"; // Import ArrowLeft icon

export default function SignUp() {
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  };

  const handleEmailChange = () => {
    const email = emailRef.current?.value;
    if (!email) {
      setEmailError("");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = () => {
    const password = passwordRef.current?.value;
    if (!password) {
      setPasswordError("");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else if (!validatePassword(password)) {
      setPasswordError("Password must contain at least one uppercase letter, one lowercase letter, and one number");
    } else {
      setPasswordError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required!");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number");
      return;
    }

    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    
    if (!response.ok) {
      setError("Failed to register user, please try different credentials!");
      return;
    }

    const token = await response.json();

    if(!token){
        setError("Incorrect Token");
        return;
    }

    login(email, token);
    navigate('/');

    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const handleBackClick = () => {
    navigate('/'); // Navigate back to home page
  };

  return (
    <>
      <Navbar/>
      <div className={style.container}>
       
        <div className={style.signupCard}>
          <div className={style.formSection}>
          <div>
          <button 
            className={style.backButton}
            onClick={handleBackClick}
            aria-label="Back to Home"
          >
            <ArrowLeft className={style.backIcon} />
          </button>
        </div>

            <h1 className={style.header}>Create Your Account</h1>            
            <form onSubmit={onSubmit}>
              <div className={style.formGroup}>
                <label htmlFor="firstName" className={style.label}>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className={style.input}
                  placeholder="Enter your first name"
                  ref={firstNameRef}
                  required
                />
              </div>
              
              <div className={style.formGroup}>
                <label htmlFor="lastName" className={style.label}>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className={style.input}
                  placeholder="Enter your last name"
                  ref={lastNameRef}
                  required
                />
              </div>
              
              <div className={style.formGroup}>
                <label htmlFor="email" className={style.label}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  className={`${style.input} ${emailError ? style.inputError : ''}`}
                  placeholder="Enter your email"
                  ref={emailRef}
                  onChange={handleEmailChange}
                  onBlur={handleEmailChange}
                  required
                />
                {emailError && <div className={style.errorMessage}>{emailError}</div>}
              </div>
              
              <div className={style.formGroup}>
                <label htmlFor="password" className={style.label}>Password</label>
                <div className={style.passwordInputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`${style.input} ${passwordError ? style.inputError : ''}`}
                    placeholder="Create a password (min 8 characters)"
                    ref={passwordRef}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordChange}
                    required
                  />
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
                {passwordError && <div className={style.errorMessage}>{passwordError}</div>}
                <div className={style.passwordHint}>
                  Password must contain:
                  <ul className={style.hintList}>
                    <li className={passwordRef.current?.value?.length >= 8 ? style.valid : style.invalid}>
                      At least 8 characters
                    </li>
                    <li className={passwordRef.current?.value?.match(/[A-Z]/) ? style.valid : style.invalid}>
                      One uppercase letter
                    </li>
                    <li className={passwordRef.current?.value?.match(/[a-z]/) ? style.valid : style.invalid}>
                      One lowercase letter
                    </li>
                    <li className={passwordRef.current?.value?.match(/\d/) ? style.valid : style.invalid}>
                      One number
                    </li>
                  </ul>
                </div>
              </div>
              
              {error && <div className={style.error}>{error}</div>}
              
              <button 
                type="submit" 
                className={style.submitBtn}
                disabled={emailError || passwordError}
              >
                CREATE ACCOUNT
              </button>
              
              <div className={style.loginLink}>
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}