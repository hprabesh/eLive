const mongoose=require('mongoose');
const postschema=mongoose.Schema({
  currentDate:String,  
  high:Number,
  medium:Number,
  low:Number,
});
module.exports=mongoose.model("prabeshStreak",postschema);
