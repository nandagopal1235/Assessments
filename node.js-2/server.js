const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateToken, authorizeRoles } = require("./authMiddleware");

const app = express();
app.use(express.json());

// Route to generate a JWT token
app.post("/login", (req, res) => {
  const { username, role } = req.body;

  // Basic input check
  if (!username || !role) {
    return res.status(400).json({ message: "Username and role are required." });
  }

  // Create token with username & role
  const token = jwt.sign({ username, role }, "secretkey", { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});

//Route accessible to all authenticated users
app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: `Hello ${req.user.username}, welcome to your profile!`,
    role: req.user.role,
  });
});

// Route only for admin users
app.get("/admin", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome, Admin! You have full access." });
});

// Route only for normal users 
app.get("/user", authenticateToken, authorizeRoles("user"), (req, res) => {
  res.json({ message: "Welcome, User! Limited access granted." });
});

// Start the server
app.listen(3000, () => {
  console.log("✅ Server is running on http://localhost:3000");
});
