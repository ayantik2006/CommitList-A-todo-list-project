const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    email:{type:String, default:""},
    password:{type:String, default:""},
    isVerified:{type:Boolean, default:false},
    linkSentAt:{type:Number}
});

module.exports=mongoose.model("Account",schema);