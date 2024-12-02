import React, { useState } from "react";
import styles from "./login.module.css";

const mainUrl = "http://localhost:4000/auth";

const AuthForm: React.FC = () => {
  const [isLogInForm, setIsLogInForm] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const { email, password, confirmPassword, userName } = formData;

    try {
      const url = isLogInForm ? `${mainUrl}/login` : `${mainUrl}/signup`;

      if (!isLogInForm && password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          ...(isLogInForm ? {} : { confirmPassword, name: userName }),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong!");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitFormHandler} className={styles.form}>
        <h1 className={styles.title}>
          {isLogInForm ? "Login" : "Sign Up"}
        </h1>
        <p className={styles.subtitle}>
          {isLogInForm
            ? "Sign in to continue"
            : "Create a new account"}
        </p>

        {!isLogInForm && (
          <div className={styles.inputGroup}>
            <label htmlFor="userName" className={styles.label}>
              Name
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              className={styles.input}
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️‍🗨️" : "🙈"}
            </button>
          </div>
        </div>

        {!isLogInForm && (
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={styles.input}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
        )}

        <button type="submit" className={styles.submitButton}>
          {isLogInForm ? "Login" : "Sign Up"}
        </button>

        <div className={styles.toggle}>
          <span
            className={styles.toggleText}
            onClick={() => setIsLogInForm(!isLogInForm)}
          >
            {isLogInForm
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
