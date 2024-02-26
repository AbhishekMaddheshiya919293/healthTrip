
const User=require("./models/User.js");
const cron = require('node-cron');
const Frequency=require("./models/Frequency.js");
const {fetchWeather}=require('./utils.js')
module.exports= async (bot)=>{

    bot.on('message', async(msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    let user= await User.findOne({chatId:chatId})
    try{
    if((messageText === '/start' || messageText === '/getUpdate') && user && user.status==="Inactive"){
        bot.sendMessage(chatId, 'You are blocked by admin');
    }
    else if(messageText === '/start' && !user){
      user = new User({chatId: chatId});
      await user.save();
      bot.sendMessage(chatId, 'Name');
    }
    else if(!user.name && messageText) {
        user.name=messageText;
        await user.save();
        console.log("name added")
        bot.sendMessage(chatId,"City name")
        }
    else if(!user.city && messageText ) {
          user.city=messageText;
        await user.save();
          bot.sendMessage(chatId,"Country name")
        }
    else if(!user.country && messageText) {
          user.country=messageText;
          await user.save();
          bot.sendMessage(chatId,"/getUpdate")
        }
    else if(messageText==="/getUpdate"){
        const data= await fetchWeather(user.city,user.country);
        console.log("In the before ",data);
        const message= `Weather update for ${user.city}, ${user.country},\nTemp Fahrenite: ${data.current.temp_f},\nTemp Celcius: ${data.current.temp_c},\nCondition: ${data.current.condition.text},\nWind Mph: ${data.current.wind_mph}`
        bot.sendMessage(chatId,message);
    }
    }catch(err){
       bot.sendMessage(chatId,"some error occured")
    }
  });

  //scheduling the event
  const freqeuncyData=await Frequency.findOne({frequencyId:1});
  cron.schedule(freqeuncyData.frequency, async () => {
    const users = await User.find();
    users.forEach(async (user) => {
        //Handling blocked case
        if(user.status==="Inactive"){
            return;
        }else{
        const data = await fetchWeather(user.city, user.country);
        console.log(data);
        const message= `Weather update for ${user.city}, ${user.country},\nTemp Fahrenite: ${data.current.temp_f},\nTemp Celcius: ${data.current.temp_c},\nCondition: ${data.current.condition.text},\nWind Mph: ${data.current.wind_mph}`
        bot.sendMessage(user.chatId,message);  
        }
    });
})};
