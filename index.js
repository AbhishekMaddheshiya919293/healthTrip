const express = require('express');
const app=express();
require('dotenv').config()
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const TelegramBot = require('node-telegram-bot-api');
const token=process.env.TELEGRAMAPI;

const portalRoute = require("./routes/portalRoute");
const helmet = require("helmet");
const authRoute = require("./routes/authRoute");

const botlogic = require('./botlogic')



const connect = () => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log('db conntected');
      })
      .catch((err) => {
        throw err;
      });
  };
  app.use(cookieParser())
  app.use(express.json());
  app.use(helmet());

  /// here function for handling all botLogic
  const bot = new TelegramBot(token, { polling: true });
  botlogic(bot);
  app.use("/api/auth", authRoute);
  app.use("/api/portal", portalRoute);

  //Global error handler

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'something went wrong';
    return res.status(status).json({
      success: false,
      status: status,
      message,
    });
  });


app.listen(process.env.PORT,()=>{
    connect()
    console.log(`listening at port ${process.env.PORT}`)
  })
