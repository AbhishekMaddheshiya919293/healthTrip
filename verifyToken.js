const jwt=require("jsonwebtoken");
const createError=require('./error');
const verifyToken=(req,res,next)=>{
 const token=req.cookies.access_token
  if(!token){
    return next(createError(401,"You are not authenticated user"));
  }
  jwt.verify(token,process.env.JWT,(err,adminId)=>{
    if(err){
        return next(createError(403,"token not authenticated"));
    }
    req.adminId=adminId;
    next();
  })
}

module.exports=verifyToken;