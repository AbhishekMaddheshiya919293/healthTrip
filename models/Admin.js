const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
    {
      firstName: {
        type: String
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
      },
      password: {
        type: String,
      }
    }
);

const admin= mongoose.model("Admin", AdminSchema);
module.exports=admin;