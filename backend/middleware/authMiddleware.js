const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 
 const authMiddleware = async(req,res,next)=>{
     
      if(!req.headers.authorization){
        return res.status(411).json({
             msg:"header is required"
        })
      } 
     const token = req.headers.authorization.split(" ")[1];  
     try{
       const decode=jwt.verify(token,process.env.JWT_SECRET);  
       req.userId=decode.userId; 
       next();
     } 
     catch(err){
       res.status(401).json({
         msg:"Invalid token"
       })
     }

} 

module.exports={authMiddleware}