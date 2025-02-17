import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Welcome.module.css"; // Importing CSS module

type WelcomePageProps = {
  username: string;
  pendingTasks: number;
  completedTasks: number;
};

const WelcomePage: React.FC<WelcomePageProps> = ({
  username,
  pendingTasks,
  completedTasks,
}) => {
  const navigate = useNavigate();

  // Calculate task completion percentage
  username = 'Gourav'
  const totalTasks = pendingTasks + completedTasks;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className={classes.welcomeContainer}>
      {/* Profile Section */}
      <div className={classes.profileSection}>
        <img src={`https://ui-avatars.com/api/?name=${username}`} alt="Profile" className={classes.profilePic} />
        <h1>Welcome, {username}!</h1>
        <p>Your personalized task management dashboard.</p>
      </div>

      {/* Task Summary with Progress Bar */}
      <div className={classes.taskSummary}>
        <div className={`${classes.taskCard} ${classes.pending}`}>
          <h2>{pendingTasks}</h2>
          <p>Pending Tasks</p>
        </div>
        <div className={`${classes.taskCard} ${classes.completed}`}>
          <h2>{completedTasks}</h2>
          <p>Completed Tasks</p>
        </div>
      </div>

      <div className={classes.progressBar}>
        <div className={classes.progressFill} style={{ width: `${completionPercentage}%` }}></div>
      </div>
      <p>{completionPercentage.toFixed(2)}% Tasks Completed</p>

      {/* Recent Activity Section */}
      <div className={classes.recentActivity}>
        <h2>Recent Activity</h2>
        <ul>
          <li>✅ Task "Fix UI Bug" completed</li>
          <li>🚀 New task "Design Dashboard" added</li>
          <li>🔄 Task "Refactor Code" updated</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className={classes.buttonsContainer}>
        <button className={classes.button} onClick={() => navigate("/tasks")}>View Tasks</button>
        <button className={classes.button} onClick={() => navigate("/add")}>Add New Task</button>
        <button className={classes.button} onClick={() => navigate("/settings")}>Settings</button>
        <button className={`${classes.button} ${classes.secondary}`} onClick={() => navigate("/reports")}>Reports</button>
      </div>
    </div>
  );
};

export default WelcomePage;
