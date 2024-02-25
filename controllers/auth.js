const createError=require('../error.js')
const Admin=require("../models/Admin.js");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");


const registration=async (req, res, next) => {
    try {
      //generate new hased password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //create new user
      const newAdmin = new Admin({
        //here we are giving all required field to save
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });
  
      //save user and respond
      const admin = await newAdmin.save();
      res.status(200).json(admin);
    } catch (err) {
      const customError=createError(404,"User already exits")
      next(err);
    }
  }

const signin=async(req,res,next)=>{
    try{
       const admin=await Admin.findOne({
        email:req.body.email
       });
       if(!admin){
        return next(createError(404,"No user find"))
       }
       const isCorrect=await bcrypt.compare(req.body.password,admin.password);
       if(!isCorrect){
        const customError=createError(404,"Provide correct credential")
        return next(customError);
       }
       //here using we can't show hashedPassword to client
       admin.password=undefined;
       const token=jwt.sign({id:admin._id},process.env.JWT);
       res.cookie("access_token",token,{
        httpOnly:true
       }).status(200).json({token,
        admin});
    }catch(err){
       next(err);
    }
   }





module.exports={registration,signin};