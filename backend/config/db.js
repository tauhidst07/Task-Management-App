const mongoose = require("mongoose"); 
require("dotenv").config(); 

const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL); 
        console.log("DB connected");
    } 
    catch(err){
        console.log("db connection err",err);
    }
}  

dbConnect();  

const userSchema = mongoose.Schema({
    name:{
        type:String, 
        trim:true, 
        required:true, 
        maxlength:30
    }, 
    email:{
        type:String, 
        trim:true, 
        required:true
    }, 
    password:{
        type:String,  
        required:true, 
        minlength:6 
    }
})  

const taskSchema = mongoose.Schema({
      title:{
        type:String, 
        required:true
      },  
      description:{
        type:String, 
        required:true
      },   
      status:{
        type:String, 
        enum:["completed","pending"], 
        default:"pending"
      }, 
      priority:{
        type:Number, 
        enum:[1,2,3], 
        default:2
      }, 
      deadline:{
        type:Date, 
        required:true
      }, 
      userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User", 
        required:true
      }
      
      
})

const User = mongoose.model('User',userSchema);  
const Task = mongoose.model('Task',taskSchema);

module.exports={User,Task};