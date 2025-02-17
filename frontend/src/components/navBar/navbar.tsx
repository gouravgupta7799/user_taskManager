// import React, { useState, useEffect } from "react";
import classes from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { themeActions } from "../store/themeSlice";

const Navbar: React.FC<any> = ({ onBanner }) => {
  const isLoggedIn: boolean = useSelector((state: any) => state.authRdx.isLoggedIn);

  // Dark Mode State
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode); // Get Dark Mode from Redux

  // Toggle Dark Mode (Dispatch Redux Action)
  const toggleDarkMode = () => {
    dispatch(themeActions.toggleDarkMode()); // No useState needed!
  };

  return (
    <header className={`${classes.formHeader} ${darkMode ? classes.dark : classes.light}`}>
      <div className={classes.logo}>
        <h1 className={classes.logoText}>Task Manager</h1>
      </div>

      <nav className={classes.nav}>
        <a href="/" className={classes.navLink}>
          My Saved Tasks
        </a>

        {!isLoggedIn ? (
          <button className={classes.loginButton} onClick={() => onBanner.setBanner(!onBanner.banner)}>
            Login/Signup
          </button>
        ) : (
          ""
        )}

        <div className={classes.language}>
          <span>🌐 EN</span>
        </div>

        {/* Dark Mode Toggle Button */}
        <button className={classes.toggleBtn} onClick={toggleDarkMode}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
