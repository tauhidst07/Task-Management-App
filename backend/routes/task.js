const express = require('express'); 
const { authMiddleware } = require('../middleware/authMiddleware'); 
const zod = require("zod");
const { Task } = require('../config/db');

const router = express.Router();  


const taskInput = zod.object({
    title:zod.string(), 
    description:zod.string(),   
    priority:zod.enum(["1","2","3"]).optional(),   
    deadline:zod.string().refine((value)=>!isNaN(Date.parse(value))),  
    status:zod.enum(["completed","pending"]).optional()
})

router.post("/",authMiddleware,async(req,res)=>{
      const parsed = taskInput.safeParse(req.body);  
      if(!parsed.success){
        return res.status(403).json({
            msg:"Invalid input"
        })
      }  
      const task =await Task.create({
        title:req.body.title, 
        description:req.body.description,  
        priority:Number(req.body.priority), 
        status:req.body.status, 
        deadline:req.body.deadline, 
        userId:req.userId
      }) 
      res.json({
        msg:"task cretaed", 
        task
      })
})  

router.get("/",authMiddleware,async(req,res)=>{
    const {status,sortBy} = req.query; 
    let query = {}; 
    if(status){
        query.status=status;
    }  
    let sortByoption={}
    if(sortBy == "priority"){
      sortByoption.priority=1;
    } 
    else if(sortBy == "deadline"){
        sortByoption.deadline=-1;
    } 

    const tasks = await Task.find(query).sort(sortByoption);   
    const tasksWithISTDeadlines = tasks.map(task => ({
      ...task.toObject(),  // Convert task to a plain JavaScript object
      deadline: new Date(task.deadline).toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour12: true  // Use 24-hour format (set to true for 12-hour format)
      })
  }));

    return res.json({
        tasksWithISTDeadlines
    })
})

router.put("/:id",authMiddleware,async(req,res)=>{
    const id = req.params.id; 
    const dataToupdate = req.body; 
    const updatedTask = await Task.findByIdAndUpdate(id,dataToupdate,{
        new:true
    }); 

    res.json({
      updatedTask
    })
})  

router.delete("/:id",authMiddleware,async(req,res)=>{
    const id = req.params.id; 
    await Task.findByIdAndDelete(id); 
    res.json({
      msg:"task deleted"
    })
})

module.exports=router