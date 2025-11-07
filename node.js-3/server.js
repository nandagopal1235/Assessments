const express = require("express");
const app = express();

app.use(express.json());

// Store scheduled tasks in memory
const scheduledTasks = [];

// POST /schedule route
app.post("/schedule", (req, res) => {
  const { task, datetime, log } = req.body;

  if (!task || !datetime || !log) {
    return res.status(400).json({ error: "Please provide task, datetime, and log" });
  }

  const scheduledTime = new Date(datetime);
  const currentTime = new Date();

  const delay = scheduledTime - currentTime;

  if (delay <= 0) {
    return res.status(400).json({ error: "Scheduled time must be in the future" });
  }

  // Store the task
  const newTask = { task, datetime, log };
  scheduledTasks.push(newTask);

  // Schedule the task
  setTimeout(() => {
    console.log(`[${new Date().toLocaleString()}] ${log}`);
  }, delay);

  res.json({ message: "Task scheduled successfully", task: newTask });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
