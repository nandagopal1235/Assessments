export default function TaskList({ tasks, toggleTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li className={task['completed']==true&&'completed'} key={task.id} onClick={() => toggleTask(task.id)}>
          {task.text}
        </li>
      ))}
    </ul>
  );
}
