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
  const [isLogin, setIsLogin] = useState(false);
  let [banner, setBanner] = useState(false);

  const isLoggedIn: boolean = useSelector((state: any) => state.authRdx.isLoggedIn);
console.log(isLoggedIn)
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
      
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={ banner && <Banner />}
          />

          <Route
            path="/login"
            // element={!isLoggedIn ? <AuthForm isLogedIn={true}/> : <Welcome />}
            element={ <AuthForm isLogedIn={true}/>}
          />
         <Route
            path="/signup"
            element={<AuthForm isLogedIn={false} />}
          />
          <Route
            path="/add"
            element={!isLoggedIn ? <AuthForm isLogedIn={true}/>: <AddTaskForm onAddTask={addTask} />}
            // element={<AddTaskForm onAddTask={addTask} />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
