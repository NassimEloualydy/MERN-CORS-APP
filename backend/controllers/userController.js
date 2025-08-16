const User=require("../models/User");
const formidable=require("formidable")
const bcrypt=require("bcryptjs")
const fs=require("fs");
const jwt=require("jsonwebtoken")
exports.login=async (req,res)=>{
    const {email,pw}=req.body;
    require("dotenv").config()
    var data=await User.find({email}).select("-photo")
    if(data.length==0)
        return res.status(400).json({err:"Please the email is not found !!"})
    u=await bcrypt.compare(pw,data[0].pw)
    if(!u)
        return res.status(400).json({err:"Please the password is wrong !!"})
    const token=await jwt.sign({_id:data[0]._id,first_name:data[0].first_name,last_name:data[0].last_name,role:data[0].role},process.env.JWT_SECRTE,{expiresIn:"30d"})
    return res.json({first_name:data[0].first_name,last_name:data[0].last_name,role:data[0].role,token})
    }
exports.register= async (req,res)=>{
    const form=new formidable.IncomingForm()
    form.keepExtensions=true;
    form.parse(req,async (err,fields,files)=>{
        const {first_name,last_name,email,password,phone}=fields
        var data=await User.find({first_name,last_name}).select("-photo")
        if(data.length!=0)
            return res.status(400).json({err:"Please the first name and the last name are already exist !!"})
        data=await User.find({phone}).select("-photo")
        if(data.length!=0)
            return res.status(400).json({err:"Please the phone name are already exist !!"})
        data=await User.find({email}).select("-photo")
        if(data.length!=0)
            return res.status(400).json({err:"Please the email name are already exist !!"})
        const salt=await bcrypt.genSalt(10)
        const hashed_password=await bcrypt.hash(password,salt)
        const user=await User.create({
            first_name,last_name,email,phone,role:"User",pw:hashed_password,
            photo:{
                data:fs.readFileSync(files.photo.path),
                contentType:files.photo.type
            }
        })
        if(user)
            return res.json({message:"Registered With Success !!"})
        return res.status(400).json({err:user})

        // const salt=await bcrypt.genSalt(10)
        // const pw=await bcrypt.hash(password,salt)
        // const res=await bcrypt.compare(password,pw)
        // console.log(pw)
    })
}