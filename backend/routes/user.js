
const express = require("express");  
const router = express.Router();  
const zod = require("zod"); 
const { User } = require("../config/db"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 
require("dotenv").config();

const userRegister = zod.object({
    name:zod.string().max(30), 
    email:zod.string().email(), 
    password:zod.string().min(6)
})


router.post("/register",async(req,res)=>{
    const {success} = userRegister.safeParse(req.body); 
    if(!success){
       return res.status(400).json({
            msg:"Invalid input"
        }) 
    }   
    const existingUser = await User.findOne({email:req.body.email}); 
    if(existingUser){
      return res.status(409).json({
            msg:"user already exisit"
        })
    }
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const user = await User.create({
        name:req.body.name, 
        email:req.body.email, 
        password:hashedPassword
    }) 
    
    const token = jwt.sign({
        userId:user._id
    },process.env.JWT_SECRET) 

    res.json({
        msg:"user registered successfully", 
        token, 
    })
})  


const userLogin = zod.object({
    email:zod.string().email(), 
    password:zod.string().min(6)
})

router.post("/login",async(req,res)=>{
    const {success} = userLogin.safeParse(req.body); 
    if(!success){
        return res.status(400).json({
            msg:"invalid input"
        })
    } 
    const user = await User.findOne({email:req.body.email}); 
    if(!user){
        return res.status(403).json({
            msg:"user not found"
        })
    } 
    
    if(! await bcrypt.compare(req.body.password,user.password)){
        return res.status(401).json({
            msg:"incorrect password"
        })
    }  

    const token = jwt.sign({
        userId:user._id
    },process.env.JWT_SECRET); 

    return res.json({ 
        msg:"logged in successfully",
        token
    })
}) 

module.exports=router