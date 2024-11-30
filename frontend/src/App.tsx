import React, { useState } from "react";
import TaskList, { Task } from "./components/task/TaskList";
import AddTaskForm from "./components/task/AddTaskForm";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState(false);
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
        title: title,
        completed: completed,
        taskMessage: taskMessage,
        description: description,
        dueDate: dueDate,
      },
    ]);
  };
  return (
    <div>
      <h1>User Task Management App</h1>
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={form}
            onChange={(e) => setForm(e.target.checked)}
          />
        </label>
      </div>
      {form ? <AddTaskForm onAddTask={addTask} /> : "add task"}
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;
