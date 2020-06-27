var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose=require('mongoose');
var fs=require('fs');
var cors=require('cors');
var cors = require("cors");
require('dotenv/config');

app.set('view engine', 'ejs'); //coz our index page has an extension .ejs
// app.use('/api/members',require('./routes/api/members'));  ->IN CASE YOU WANNA USE AN API
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
file='./users/prabesh.json';

//creating a router for form action
app.use('/',require('./routes/form-post'));
app.use('/', require('./routes/graph'));

//creating a connection to home page
app.get('/',(req,res)=>{
   main=[];  //for storing the task ... JUST FRONTEND STUFF
   pendPassID=[]; //for rendering the id of pending task  VVIMP
   compPassID=[];// for rendering the id of completed task VVIMP 
   complete=[];
  try{
    fs.readFile(file, 'utf-8', (err, contents) => {
        for (var i=0;i<JSON.parse(contents)[0].length;i++){
            if (JSON.parse(contents)[0][i].taskStatus=="pending"){
              main.push(JSON.parse(contents)[0][i].task+"-"+JSON.parse(contents)[0][i].dueDate+"-"+JSON.parse(contents)[0][i].dueTime+":::"+JSON.parse(contents)[0][i].taskStatus+"::> Priority Level: "+JSON.parse(contents)[0][i].priorityLevel);           
              pendPassID.push(JSON.parse(contents)[0][i]._id);
              
            } else if (JSON.parse(contents)[0][i].taskStatus=="completed") {
              complete.push(JSON.parse(contents)[0][i].task+"-"+JSON.parse(contents)[0][i].dueDate+"-"+JSON.parse(contents)[0][i].dueTime+":::"+JSON.parse(contents)[0][i].taskStatus+"::> Priority Level: "+JSON.parse(contents)[0][i].priorityLevel);           
              compPassID.push(JSON.parse(contents)[0][i]._id);
            }
          }
        res.render("index");
    });
  } catch(err){
    console.log(err);   
  }
})


//cross origin platform
var corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200 
}
 
app.use (cors());


// FOR CONNECTING FROM FRONTEND TO BACKEND

//for pending task 
app.get('/pendingTask',async(req,res)=>{
  main=[];  //for storing the task ... JUST FRONTEND STUFF
  pendPassID=[]; //for rendering the id of pending task  VVIMP
 try{
   fs.readFile(file, 'utf-8', (err, contents) => {
       for (var i=0;i<JSON.parse(contents)[0].length;i++){
           if (JSON.parse(contents)[0][i].taskStatus=="pending"){
             main.push(JSON.parse(contents)[0][i]);
           }
         }
       res.json(main);
   });
 } catch(err){
   console.log(err);   
 }
})

//for completed task
app.get('/completedTask',async(req,res)=>{
  main=[];  //for storing the task ... JUST FRONTEND STUFF
  pendPassID=[]; //for rendering the id of pending task  VVIMP
 try{
   fs.readFile(file, 'utf-8', (err, contents) => {
       for (var i=0;i<JSON.parse(contents)[0].length;i++){
           if (JSON.parse(contents)[0][i].taskStatus=="completed"){
             main.push(JSON.parse(contents)[0][i]);
           }
         }
       res.json(main);
   });
 } catch(err){
   console.log(err);   
 }
})


//connection to database for tasks and streak
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true, useUnifiedTopology:true},()=>{
  console.log("Connected to TODO LIST Database Server");
})
mongoose.set('useFindAndModify', false);

//listen to port
 app.listen(process.env.PORT||9001, function () {
  console.log('The server app is listening on port   9001!')
});
app.listen(9001, '10.199.140.162');
