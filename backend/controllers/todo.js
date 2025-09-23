const Todo = require("../models/Todo.js");
const jwt = require("jsonwebtoken");
const SECRET=process.env.SECRET;

exports.create = async (req, res) => {
  let { todoContent, editedTime } = req.body;
  if (todoContent.trim() === "") return res.json({ msg: "empty" });
  try {
    const email = await jwt.verify(req.cookies.id, SECRET).id;
    const x = await Todo.create({
      email: email,
      todoContent: todoContent.trim(),
      editedTime: editedTime,
    });
    res.json({ msg: "success", id: String(x._id) });
  } catch (e) {
    return res.json({ msg: "logged out" });
  }
};

exports.updateChecked = async (req, res) => {
  const { isChecked, id } = req.body;
  try {
    const email = await jwt.verify(req.cookies.id, SECRET).id;
    const userData = await Todo.updateOne(
      { _id: id },
      { isChecked: isChecked }
    );
    return;
  } catch (e) {
    return res.json({ msg: "logged out" });
  }
};

exports.read = async (req, res) => {
  try {
    const email = await jwt.verify(req.cookies.id, SECRET).id;
    const userData = await Todo.find({ email: email });
    return res.json({ data: userData.reverse(), msg: "success" });
  } catch (e) {
    return res.json({ msg: "logged out" });
  }
};

exports.delete = async (req, res) => {
  try {
    const email = await jwt.verify(req.cookies.id, SECRET).id;
    await Todo.deleteOne({ _id: req.body.id });
    return;
  } catch (e) {
    return res.json({ msg: "logged out" });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const email = await jwt.verify(req.cookies.id, SECRET).id;
    const { id, todoContent, editedTime } = req.body;
    const userData = await Todo.findOne({ _id: id });
    if (userData.todoContent === todoContent.trim()) return;
    await Todo.updateOne(
      { _id: id },
      { todoContent: todoContent, editedTime: editedTime }
    );
    return res.json({editedTime:editedTime});
  } catch (e) {
    return res.json({ msg: "logged out" });
  }
};
