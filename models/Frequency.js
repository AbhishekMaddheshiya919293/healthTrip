const mongoose = require("mongoose");

const frequencySchema = new mongoose.Schema(
    {
      frequency: {
        type: String,
        default: '38 15 * * *'
      }
    }
);

const frequency= mongoose.model("Admin", frequencySchemaSchema);
module.exports=frequency;