// main purpose: MONGODB CRUD Operation only. NO OTHER TASK!!!!!!
//append ./users/.json file only and update MONGODB file from that and redirec to index


//importing sys files
const Post=require('../models/posts');
const Streak=require('../models/streak');
const file='./users/prabesh.json'; // for now only -> To record task
const file1='./users/streak.json'; // for now only -> To record the streaks 

const express=require("express");
var bodyParser=require('body-parser');
var jsonfile=require('jsonfile');
const router=express.Router();
//implementing middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//imp global  variable  
var dateObj=new Date();

//routing post 
router.post('/addTask',async(req,res)=>{
    var newTask = req.body.newtask;
    var dueDate=req.body.dueDate;
    var dueTime=req.body.dueTime;
    var priority=req.body.priority;
    var submissionTime=(parseInt(dateObj.getMonth())+1).toString(10)+"-"+dateObj.getDate()+"-"+dateObj.getFullYear()+"::"+dateObj.getHours()+"-"+dateObj.getMinutes()+"-"+dateObj.getSeconds();
    var taskStatus="pending";
    const post=new Post({
        task:newTask,
        dueDate:dueDate,
        dueTime:dueTime,
        currentDate:submissionTime,
        priorityLevel:priority,
        taskStatus:taskStatus,
    });
    console.log(post);
    try{
        const savedPost=await post.save();
    } catch(err){
        console.log(err);
    }
    try{
        const values=(await Post.find());
        jsonfile.writeFile(file,[values],{ spaces: 2, EOL: '\r\n' },function(err){
            console.error(err)
       });
       res.redirect('/');
    } catch(err){
        console.log(err);
    }
});// completed dev version for jsonifying and rendering the data from MONGODB

// completed task
router.post('/completeTask', async(req,res)=>{
    var submissionTime=(parseInt(dateObj.getMonth())+1).toString(10)+"-"+dateObj.getDate()+"-"+dateObj.getFullYear()+"::"+dateObj.getHours()+"-"+dateObj.getMinutes()+"-"+dateObj.getSeconds();
    var submissionDate=(parseInt(dateObj.getMonth())+1).toString(10)+"-"+(dateObj.getDate()).toString(10)+"-"+(dateObj.getFullYear()).toString(10);
    var enteringPriorityLevel=[];
        
    try{
        const updatedtask=await Post.updateMany({_id:{$in:req.body.check}},{$set:{taskStatus:"completed",currentDate:submissionTime}},{safe: true, upsert: true, new: true },function(err,result){}); // changing the status of task from PENDING to COMPLETED 
        console.log(req.body.check+" has been completed");
        const values=(await Post.find());
        values.forEach(function(item) {
            if (item.taskStatus=="completed" && item.currentDate.split("::")[0]==submissionDate &&req.body.check==item._id){
                enteringPriorityLevel.push(item.priorityLevel);
            }
        })
        jsonfile.writeFile(file,[values],{ spaces: 2, EOL: '\r\n' },function(err){});
    }catch(err){
        console.log(err);
    }
    console.log((await Streak.find()).length);
    if ((Streak.find()).length==0){
        const streak=new Streak({
            currentDate:submissionDate,  
            high:0,
            medium:0,
            low:0,
        });
        const savedStreak=streak.save();
    }
    console.log(enteringPriorityLevel);
    enteringPriorityLevel.forEach(function(item){
        console.log(item);
        if (item=="high"){
            const updatedStreak= Streak.updateMany({currentDate:submissionDate},{$inc:{high:1,medium:0,low:0}},{safe: true, upsert: true, new: true }, (err, writeResult) => {});
            console.log("highdone");
        } else if (item=="medium"){
            console.log("meddone");
            const updatedStreak= Streak.updateMany({currentDate:submissionDate},{$inc:{high:0,medium:1,low:0}},{safe: true, upsert: true, new: true }, (err, writeResult) => {});
        } else if (item=="low"){
            console.log("lowdone");
            const updatedStreak= Streak.updateMany({currentDate:submissionDate},{$inc:{high:0,medium:0,low:1}},{safe: true, upsert: true, new: true }, (err, writeResult) => {});
        }else{
            
        }
    });            
    res.redirect('/');
     // completed dev version for changing the status of pending to COMPLETES

})




//deleting task
router.post('/removeTask',async(req,res)=>{
    console.log(req.body.check+" has been deleted");
    try{
        const removedTask=await Post.deleteMany({
            _id: {$in: req.body.check}
        });
        const values=(await Post.find());
        jsonfile.writeFile(file,[values],{ spaces: 2, EOL: '\r\n' },function(err){
            console.error(err);
       });
        res.redirect('/');
    } catch(err){
        console.log(err);
    }

}); // completed dev version for removing the tasks by id








module.exports=router;


