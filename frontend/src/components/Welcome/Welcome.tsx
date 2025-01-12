// WelcomePage.tsx
import React from "react";
import "./Welcome.css"; // External CSS for better styling
import { useNavigate } from "react-router-dom";

type WelcomePageProps = {
  username: string; // User's name
  pendingTasks: number; // Count of pending tasks
  completedTasks: number; // Count of completed tasks
};

const WelcomePage: React.FC<WelcomePageProps> = ({
  username,
  pendingTasks,
  completedTasks,
}) => {

    const history = useNavigate()

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>Welcome, {username}!</h1>
        <p>Your personalized task management hub.</p>
      </div>

      <div className="task-summary">
        <div className="task-card pending">
          <h2>{pendingTasks}</h2>
          <p>Pending Tasks</p>
        </div>
        <div className="task-card completed">
          <h2>{completedTasks}</h2>
          <p>Completed Tasks</p>
        </div>
      </div>

      <div style={styles.buttonsContainer}>
        <button style={styles.button} onClick={() => alert("Navigating to Tasks")}>View Tasks</button>
        <button style={styles.button} onClick={() => {alert("Navigating to Add Task"); history('/add')}}>Add New Task</button>
        <button style={styles.button} onClick={() => alert("Navigating to Settings")}>Settings</button>
      </div>
    </div>
  );
};

const styles = {
    buttonsContainer: {
      display: "flex",
      gap: "15px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      color: "#fff",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };
  
  export default WelcomePage;
  