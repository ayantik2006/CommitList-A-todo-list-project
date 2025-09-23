const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongodb = require("./config/db.js");

const app = express();
mongodb();

const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(SECRET));
app.use(cors({
  origin: "https://commitlist-a-todo-list-project.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const frontendPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendPath));

// API routes
const authRoutes = require("./routes/auth.js");
const todoRoutes = require("./routes/todo.js");
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

// Catch-all route for React Router
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server live on port ${PORT}`);
});
