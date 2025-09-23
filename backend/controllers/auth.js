const jwt = require("jsonwebtoken");
const Account = require("../models/Account.js");
const bcrypt = require("bcrypt");
const { sendVerificationLink } = require("../services/sendVerificationLink.js");
const SECRET=process.env.SECRET;

exports.getUserInfo = (req, res) => {
  try {
    const email = jwt.verify(req.cookies.id, SECRET).id;
    res.json({ msg: "success" });
  } catch (err) {
    res.json({ msg: "failure" });
  }
};

exports.signup = async (req, res) => {
  let { email, password, confirmPassword } = req.body;
  let userData = await Account.findOne({ email: email });
  if (password !== confirmPassword) {
    return res.json({ msg: "password error" });
  } else if (userData !== null && userData.isVerified === true) {
    return res.json({ msg: "email error 1" });
  } else if (userData !== null && userData.isVerified === false) {
    if (new Date().getTime() / 1000 - userData.linkSentAt >= 60) {
      await Account.updateOne(
        { email: email },
        { linkSentAt: new Date().getTime() / 1000 }
      );
      sendVerificationLink(email, userData._id);
      return res.json({ msg: "success" });
    } else return res.json({ msg: "email error 2" });
  } else if (userData === null) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Account.create({
      email: email,
      password: hashedPassword,
      linkSentAt: new Date().getTime() / 1000,
    });
    sendVerificationLink(email, userData._id);
    res.json({ msg: "success" });
  }
};

exports.verify = async (req, res) => {
  let userData = await Account.findOne({ _id: req.params.id });
  if (
    new Date().getTime() / 1000 - userData.linkSentAt >= 10 * 60 &&
    userData.isVerified === false
  ) {
    res.render("../views/verifyExpired.ejs");
  } else if (userData.isVerified === true) {
    res.render("../views/verified.ejs");
  } else {
    userData.isVerified = true;
    userData.save();
    res.render("../views/verify.ejs");
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  console.log("before");
  let userData = await Account.findOne({ email: email });
  console.log("before");
  if (userData === null) {
    return res.json({ msg: "failure" });
  } else if (
    userData !== null &&
    !(await bcrypt.compare(password, userData.password))
  ) {
    return res.json({ msg: "failure" });
  } else {
    const token = jwt.sign({ id: email }, SECRET);
    res.cookie("id", token, {
      httpOnly: true,
      secure: false, // later change to true
      sameSite: "strict",
    });
    res.json({ msg: "success" });
  }
};

exports.signout = async (req, res) => {
  try {
    const email = jwt.verify(req.cookies.id, SECRET).id;
    res.clearCookie("id", {
      httpOnly: true,
      secure: false, // later make it true
      sameSite: "strict", 
    });
    return res.json({});
  } catch (e) {
    console.log(e);
    return res.json({});
  }
};
