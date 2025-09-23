const express=require("express");
const router=express.Router();

const todoController=require("../controllers/todo.js");

router.post("/create",todoController.create);
router.post("/update-checked",todoController.updateChecked);
router.post("/update-content",todoController.updateContent);
router.post("/read",todoController.read);
router.post("/delete",todoController.delete);

module.exports=router;