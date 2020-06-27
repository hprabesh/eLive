const mongoose=require('mongoose');
const postschema=mongoose.Schema({
  task:String,
  dueDate:String,
  dueTime:String,
  currentDate:String,
  priorityLevel:String,
  taskStatus:String,
});
module.exports=mongoose.model("prabesh",postschema);
