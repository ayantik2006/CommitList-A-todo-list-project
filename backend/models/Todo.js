const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    email:{type:String, default:""},
    todoContent:{type:String, default:""},
    editedTime:{type:String, default:""},
    isChecked:{type:Boolean, default:false}
});

module.exports=mongoose.model("Todo",schema);