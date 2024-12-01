import React from "react";
import classes from "./navbar.module.css";

const Navbar: React.FC<any> = ({ onBanner }) => {
  return (
    <header className={classes["formHeader"]}>
      <div className={classes["logo"]}>
        <h1 className={classes["logoText"]}>Task Manager</h1>
      </div>
      <nav className={classes["nav"]}>
        <a href="/" className={classes["navLink"]}>
          My Saved Tasks
        </a>
        <button onClick={() => onBanner.setBanner(!onBanner.banner)}>
          login
        </button>
        <div className={classes["language"]}>
          <span>🌐 EN</span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
