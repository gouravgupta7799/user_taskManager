import React, { useState } from "react";
import styles from "./login.module.css";
import { requestModule } from "../../helpers/request";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const mainUrl = `${backendUrl}/user/auth`;

type AuthFormProps = {
  isLogedInForm: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ isLogedInForm }) => {

  const [isLogInForm, setIsLogInForm] = useState(isLogedInForm);
  const [formData, setFormData] = useState({
    userEmail: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const { userEmail, password, confirmPassword, userName } = formData;

    try {
      if (!isLogInForm && password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const url = isLogInForm ? `${mainUrl}/login` : `${mainUrl}/signup`;
      let body = isLogInForm ? {
        userEmail, password
      } : {
        userEmail, password, userName, confirmPassword
      };

      let Headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const response: any = await requestModule(url, "POST", body, Headers);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong!");
      }

      const data = await response.json();
      console.log("Success:", data);
      alert(`${(data as { message: string }).message}`);
      localStorage.setItem('token', isLogInForm ? data.user.token : '')
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitFormHandler} className={styles.form}>
        <h1 className={styles.title}>{isLogInForm ? "Login" : "Sign Up"}</h1>
        <p className={styles.subtitle}>
          {isLogInForm ? "Sign in to continue" : "Create a new account"}
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
          <label htmlFor="userEmail" className={styles.label}>
            Email
          </label>
          <input
            id="userEmail"
            name="userEmail"
            type="email"
            className={styles.input}
            value={formData.userEmail}
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
            <div className={styles.passwordWrapper}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={styles.input}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️‍🗨️" : "🙈"}
              </button>
            </div>
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
