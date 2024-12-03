import React, { useState } from "react";
import Navbar from "./components/navBar/navbar";
import Banner from "./components/navBar/banner";
import TaskList, { Task } from "./components/task/TaskList";
import AddTaskForm from "./components/task/AddTaskForm";
import classes from "./app.module.css";
import AuthForm from "./components/loginForm/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState(true);
  let [banner, setBanner] = useState(false);

  // const isLoggedIn = useSelector((state) => state.authRdx.isLoggedIn)

  // Add a new task
  const addTask = (
    title: string,
    taskMessage: string,
    description: string,
    dueDate: string,
    completed: boolean
  ) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        taskMessage,
        description,
        dueDate,
        completed,
      },
    ]);
  };

  return (
    <div className="App">
      <Navbar onBanner={{ setBanner, banner }} />
      {banner ? <Banner /> : ""}
      <BrowserRouter>
        <Routes>
          {/*

          <main className={classes.main}>
            <h2>Welcome to Task Management App</h2>
            {banner ? <AuthForm /> : ""}

            <p>Manage your tasks efficiently and stay organized!</p>

            <div className={classes.taskSection}>
              {form ? (
                <AddTaskForm onAddTask={addTask} />
              ) : (
                <p>Click the checkbox to add a task</p>
              )}

              <TaskList tasks={tasks} />
            </div>
          </main> */}

          <Route
            path="/"
            // element={!isLoggedIn ? <AuthForm /> : <Welcome />}
            element={banner ? <AuthForm /> : ""}
          />

          <Route
            path="/add"
            // element={!isLoggedIn ? <AuthForm /> : <Welcome />}
            element={<AddTaskForm onAddTask={addTask} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
