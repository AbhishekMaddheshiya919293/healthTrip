const createError=require('../error.js');
const User=require("../models/User.js");
const Admin=require("../models/Admin.js");

const deleteUser=async(req,res,next)=>{
    try {
        const chatId=req.params.chatId;
        const result = await User.findOneAndDelete({ chatId: chatId });
        res.status(200).json({
            status: "Sucesss",
            message: "User has been deleted"
        });
    } catch (err) {
        const customError=createError(404,"Unable to delete user")
        return next(err);
    }
}

const blockUser=async(req,res,next)=>{
    try {
        const chatId=req.params.chatId;
        const result = await User.findOneAndUpdate({ chatId: chatId },{
            status: "Inactive"
        });
        res.status(200).json({
            status: "Sucesss",
            message: "User has been blocked"
        });
    } catch (err) {
        const customError=createError(404,"Unable to block user")
        return next(err);
    }
}

module.exports={deleteUser,blockUser};