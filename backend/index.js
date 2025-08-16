const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
require("dotenv").config();
const app=express()
app.use(cors())
app.use(express.json())



const DATABASE=process.env.DATABASE
const PORT=process.env.PORT || 3030
const userroutes=require("./routes/userRoutes")
app.use("/API/user",userroutes)

mongoose.connect(DATABASE).then(()=>{
    console.log("Database Connected")
}).catch(err=>{console.log(err)}
)

app.listen(PORT,()=>{
    console.log(`App Running On Port ${PORT}`)
})
