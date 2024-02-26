const mongoose = require("mongoose");

const FrequencySchema = new mongoose.Schema(
    {
        frequency: {
            type: String,
            default:'38 15 * * *'
          },
        frequencyId:{
            type:Number
        }   
    }
);

const frequency= mongoose.model("Frequency", FrequencySchema);
module.exports=frequency;