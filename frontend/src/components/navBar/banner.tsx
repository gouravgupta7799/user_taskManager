import React from "react";
import classess from "./banner.module.css";

const Banner: React.FC = () => {
  return (
    <div className={classess.banner}>
      <p>
        You are currently not logged in to the application. Existing Users{" "}
        <a href="/" className={classess.link}>
          Login
        </a>{" "}
        / New Users{" "}
        <a href="/" className={classess.link}>
          Register
        </a>{" "}
        with us.
      </p>
    </div>
  );
};

export default Banner;
