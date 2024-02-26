const express=require('express');
const portalController =require('../controllers/portal.js');
const verifyToken=require("../verifyToken.js");


const router=express.Router();

// delete user

router.get('/delete/:chatId',
verifyToken,
portalController.deleteUser);
// block user
router.get('/block/:chatId',
verifyToken,
portalController.blockUser);

router.get('/updateFrequency',
verifyToken,
portalController.updateFrequency);


module.exports=router;