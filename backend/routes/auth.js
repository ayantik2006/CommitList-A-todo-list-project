const express=require("express");
const router=express.Router();

const authController=require("../controllers/auth.js");

router.post("/user",authController.getUserInfo);
router.post("/signup",authController.signup);
router.get("/:id",authController.verify);
router.post("/signin",authController.signin);
router.post("/signout",authController.signout);

module.exports=router;