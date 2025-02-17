import React, { useState } from "react";
import Navbar from "./components/navBar/navbar";
import Banner from "./components/navBar/banner";
// import TaskList, { Task } from "./components/task/TaskList";
import { Task } from "./components/task/TaskList";
import AddTaskForm from "./components/task/AddTaskForm";
// import classes from "./app.module.css";
import AuthForm from "./components/loginForm/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import WelcomePage from "./components/Welcome/Welcome";
import Welcome from "./components/Welcome/Welcome";
import { RootState } from "./components/store";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [isLogin, setIsLogin] = useState(false);
  let [banner, setBanner] = useState(false);

  const isLoggedIn: boolean = useSelector((state: any) => state.authRdx.isLoggedIn);
  console.log(isLoggedIn)
  // Add a new task
  const addTask = (title: string, description: string, taskMessage: string, dueDate: string, priority: string, taskType: string, assignee: string, status: string, completed: boolean) => {
    setTasks((prevTasks) => [...prevTasks, { id: Date.now(), title, description, taskMessage, dueDate, priority, taskType, assignee, status, completed },
    ]);
  };

  // Dark Mode State
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode); // Get Dark Mode from Redux


  return (
    <div className="App">
      <Navbar onBanner={{ setBanner, banner }} />

      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={!isLoggedIn ? (banner && <Banner />) : isLoggedIn ? <Welcome username={""} pendingTasks={1} completedTasks={1} /> : ""}
          />

          <Route
            path="/login"
            element={!isLoggedIn ? <AuthForm isLogedInForm={true} /> : ""}
          />
          <Route
            path="/signup"
            element={!isLoggedIn ? <AuthForm isLogedInForm={false} /> : ''}
          />
          <Route
            path="/add"
            element={!isLoggedIn ? <AuthForm isLogedInForm={true} /> : <AddTaskForm darkMode={darkMode} onAddTask={addTask} />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
