const express=require("express");
const path=require("path")
const cors=require("cors");
const cookieParser=require("cookie-parser");
require("dotenv").config();
const mongodb=require("./config/db.js");

const app=express();
mongodb();
const PORT = process.env.PORT || 8080;
const SECRET=process.env.SECRET;
app.listen(PORT,()=>{
    console.log("server live");    
});
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const buildPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(buildPath));

app.set("view engine","ejs");

app.use(cors({
  origin: "https://commitlist-a-todo-list-project.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true 
}));
app.use(cookieParser(SECRET));

const authRoutes=require("./routes/auth.js");
const todoRoutes=require("./routes/todo.js");
const { mongo } = require("mongoose");
app.use("/auth",authRoutes);
app.use("/todo",todoRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});
