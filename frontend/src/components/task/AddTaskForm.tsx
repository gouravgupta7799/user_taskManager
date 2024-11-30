import React, { useState } from "react";
import "./AddTaskForm.css";

type Props = {
  onAddTask: (
    title: string,
    taskMessage: string,
    description: string,
    dueDate: string,
    completed: boolean
  ) => void;
};

const AddTaskForm: React.FC<Props> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [description, setdescription] = useState("");
  const [taskMessage, settaskMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Pass data to parent
    onAddTask(title, taskMessage, description, dueDate, completed);

    // Clear the form
    setTitle("");
    setdueDate("");
    setdescription("");
    settaskMessage("");
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 className="form-title">Add New Task</h2>

      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="form-group">
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setdueDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          placeholder="Enter task description"
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label>Task Message:</label>
        <input
          type="text"
          value={taskMessage}
          onChange={(e) => settaskMessage(e.target.value)}
          placeholder="Enter task message"
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Mark as Completed
        </label>
      </div>

      <button type="submit" className="submit-btn">
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
