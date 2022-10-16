const mongoose=require('mongoose')
const Todo=new mongoose.Schema({
 todo:{
  type:String,
  required:true
 }
})
module.exports=mongoose.model("todos",Todo)