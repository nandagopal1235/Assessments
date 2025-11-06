const jwt = require("jsonwebtoken");

// Middleware: Verify the JWT token from the Authorization header
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided. Access denied." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded; // Store user data from token for later use
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

// Middleware: Check if the user has the required role
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You don't have access." });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
