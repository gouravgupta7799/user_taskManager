import React, { useState } from "react";
import Navbar from "./components/navBar/navbar";
import Banner from "./components/navBar/banner";
import TaskList, { Task } from "./components/task/TaskList";
import AddTaskForm from "./components/task/AddTaskForm";
import classes from "./app.module.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState(false);
  let [banner, setBanner] = useState(false);

  // Add a new task
  const addTask = (
    title: string,
    taskMessage: string,
    description: string,
    dueDate: string,
    completed:boolean
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
    <div>
      <Navbar onBanner={{ setBanner, banner }} />
      {banner ? <Banner /> : ""}
      <main className={classes.main}>
        <h2>Welcome to Task Management App</h2>
        <p>Manage your tasks efficiently and stay organized!</p>

        <div className={classes.taskSection}>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={form}
                onChange={(e) => setForm(e.target.checked)}
              />
              Show Add Task Form
            </label>
          </div>

          {form ? (
            <AddTaskForm onAddTask={addTask} />
          ) : (
            <p>Click the checkbox to add a task</p>
          )}

          <TaskList tasks={tasks} />
        </div>
      </main>
    </div>
  );
};

export default App;
