import React from "react";
import classes from "./navbar.module.css";
import { useSelector } from "react-redux";

const Navbar: React.FC<any> = ({ onBanner}) => {
  const isLoggedIn: boolean = useSelector((state: any) => state.authRdx.isLoggedIn);
  return (
    <header className={classes["formHeader"]}>
      <div className={classes["logo"]}>
        <h1 className={classes["logoText"]}>Task Manager</h1>
      </div>
      <nav className={classes["nav"]}>

        <a href="/" className={classes["navLink"]}>
          My Saved Tasks
        </a>

       {!isLoggedIn? <button className={classes["login-button"]} onClick={() => onBanner.setBanner(!onBanner.banner)}>
          login/signup
        </button>:''}

        <div className={classes["language"]}>
          <span>🌐 EN</span>
        </div>
        
      </nav>
    </header>
  );
};

export default Navbar;
