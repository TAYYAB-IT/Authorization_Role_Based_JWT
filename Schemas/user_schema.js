const mongoose = require("mongoose");
const user=new mongoose.Schema({
    Name:{type:String,required:true},
    Password:{type:String,required:true},
    Username:{type:String,required:true,unique:true},
    Role:{type:String,required:true,enum:["User","Employee","Admin"]}
})
module.exports=mongoose.model('User',user);