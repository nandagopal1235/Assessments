import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [value, setValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim()) {
      console.log("Form submitted!", value);
      addTask(value);
      setValue("");
    }
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="add-task-action">
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a task.."
          className="add-task-input"
          value={value}
        />
        <button type="submit" className="add-task-btn">
          Add
        </button>
      </div>
    </form>
  );
}
