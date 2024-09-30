
const express = require("express"); 
const app = express();   
const cors = require("cors"); 
const userRoutes = require("./routes/user") 
const taskRoutes = require("./routes/task");

app.use(cors()); 
app.use(express.json());   

app.use("/api/v1/user",userRoutes); 
app.use("/api/v1/task",taskRoutes);


app.listen(3000,()=>{
    console.log("server started");
})