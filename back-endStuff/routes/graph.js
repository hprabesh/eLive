var express = require('express');
const Streak=require('../models/streak');
var bodyParser=require('body-parser');
var jsonfile=require('jsonfile');
var router=express();
const file1='./users/streak.json'; // for now only -> To record the streaks
//implementing middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/ahoy',async(req,res)=>{
  console.log("Connected To Graph JS");
  try{
    const streaks=(await Streak.find());
    streaks.forEach(await function(items){
      console.log(items);
    });
    res.json(streaks);
    jsonfile.writeFile(file1,[streaks],{ spaces: 2, EOL: '\r\n' },function(err){
      console.error(err)
 });
  } catch (err){
    console.log(err);
  }
})
module.exports=router;