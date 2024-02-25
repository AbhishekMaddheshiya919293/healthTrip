const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
      chatId: {
        type: Number
      },
      name: {
        type: String,
        default: null,
        min: 3,
        max: 20,
      },
      city: {
        type: String,
        default: null,
        max: 50,
      },
      country: {
        type: String,
        default: null,
        min: 3,
      },
      status:{
        type: String,
        default: 'Active'
      }
    }
);

const user= mongoose.model("User", UserSchema);
module.exports=user;