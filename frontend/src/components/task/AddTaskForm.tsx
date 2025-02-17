import React, { useState } from "react";
import classes from "./AddTaskForm.module.css"; // Importing CSS Module

type Props = {
  darkMode: Boolean;
  onAddTask: (
    title: string,
    description: string,
    taskMessage: string,
    dueDate: string,
    priority: string,
    taskType: string,
    assignee: string,
    status: string,
    completed: boolean
  ) => void;
};

const AddTaskForm: React.FC<Props> = ({ darkMode, onAddTask }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [taskMessage, setTaskMessage] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [taskType, setTaskType] = useState("Feature");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("To Do");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddTask(title, description, taskMessage, dueDate, priority, taskType, assignee, status, completed);

    setTitle("");
    setDueDate("");
    setDescription("");
    setTaskMessage("");
    setPriority("Medium");
    setTaskType("Feature");
    setAssignee("");
    setStatus("To Do");
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className={`${classes.taskForm} ${darkMode ? classes.dark : classes.light}`}>
      <h2 className={classes.formTitle}>Create a New Task</h2>

      <div className={classes.formGroup}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title" required />
      </div>

      <div className={classes.formGroup}>
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </div>

      <div className={classes.formGroup}>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter task description" required></textarea>
      </div>

      <div className={classes.formGroup}>
        <label>Task Message:</label>
        <input type="text" value={taskMessage} onChange={(e) => setTaskMessage(e.target.value)} placeholder="Enter task message" />
      </div>

      <div className={classes.formGroup}>
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟡 Medium</option>
          <option value="High">🔴 High</option>
          <option value="Urgent">🔥 Urgent</option>
        </select>
      </div>

      <div className={classes.formGroup}>
        <label>Task Type:</label>
        <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
          <option value="Feature">🚀 Feature</option>
          <option value="Bug">🐞 Bug</option>
          <option value="Improvement">⚡ Improvement</option>
        </select>
      </div>

      <div className={classes.formGroup}>
        <label>Assign To:</label>
        <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Enter assignee name" />
      </div>

      <div className={classes.formGroup}>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To Do">📌 To Do</option>
          <option value="In Progress">⏳ In Progress</option>
          <option value="Done">✅ Done</option>
        </select>
      </div>

      <div className={`${classes.formGroup} ${classes.checkboxGroup}`}>
        <label>
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
          Mark as Completed
        </label>
      </div>

      <button type="submit" className={classes.submitBtn}>Add Task</button>
    </form>
  );
};

export default AddTaskForm;
