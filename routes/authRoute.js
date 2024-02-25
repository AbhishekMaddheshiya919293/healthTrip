const express=require('express');
const authController =require('../controllers/auth.js');



const router=express.Router();

// Admin registration 

router.post('/registration',
authController.registration);
// Admin sign in
router.post('/signin',authController.signin);

module.exports=router;