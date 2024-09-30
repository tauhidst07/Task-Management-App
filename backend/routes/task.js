const express = require('express'); 
const { authMiddleware } = require('../middleware/authMiddleware'); 
const zod = require("zod");
const { Task } = require('../config/db');

const router = express.Router();  


const taskInput = zod.object({
    title:zod.string(), 
    description:zod.string(),   
    priority:zod.enum([1,2,3]).optional(),   
    deadline:zod.date(),  
    status:zod.enum(["completed","pending"]).optional()
})

router.post("/",authMiddleware,async(req,res)=>{
      const {success} = taskInput.safeParse(req.body);
      if(!success){
        return res.status(403).json({
            msg:"Invalid input"
        })
      } 
      const task = Task.create({
        title:req.body.title, 
        description:req.body.description,  
        priority:req.body.priority, 
        status:req.body.status, 
        deadline:new Date(req.body.deadline)
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
      sortByoption.priority=-1;
    } 
    else if(sortBy == "deadline"){
        sortByoption.deadline=-1;
    } 

    const tasks = await Task.find(status).sort(sortByoption); 

    return res.json({
        tasks
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

module.exports=router