import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { username, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect after logout
  };

  return (
    <>
      <nav className={`${style.navbar} navbar navbar-expand-lg `}>
        <div className="container-fluid">
          <div>
            <img
              src="/Imgs/Logo-removebg.png"
              alt="Logo"
              width="60"
              height="60"
            />
          </div>
          <div className=" navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`${style.navbarlnk} nav-item`}>
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className={`${style.navbarlnk} nav-item`}>
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li className={`${style.navbarlnk} nav-item`}>
                <Link className="nav-link" to="/MainPage">
                  Main Page
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav  mb-2 mb-lg-0">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <img className={style.navbarImg} src="Imgs\login.png" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/SignUp">
                      <img className={style.navbarImg} src="Imgs\signup.gif" />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </>
  );
}
