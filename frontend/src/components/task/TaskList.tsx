import React from "react";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  taskMessage: string;
  description: string;
  dueDate: string;
};

type Props = {
  tasks: Task[];
};
const TaskList: React.FC<Props> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title} - {task.dueDate} -{task.description} -
            {task.taskMessage} - {task.completed === true ? "true" : "false"} -
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
