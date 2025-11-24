export default function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          <span onClick={() => toggleTask(task.id)} className="task-text">
            {task.text}
          </span>
          <button
            className="delete-btn"
            onClick={() => deleteTask(task.id)}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
