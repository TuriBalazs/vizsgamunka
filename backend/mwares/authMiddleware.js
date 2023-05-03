const jwt=require('jsonwebtoken');
const User=require('../models/User');
const mongoose=require('mongoose');
const asyncHandler=require('express-async-handler');

const protect=asyncHandler(async (req,res,next)=>{
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            token=req.headers.authorization.split(' ')[1];
            
            const idFromtoken=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(idFromtoken.id).select('-password');
            next();
            
        } catch (error) {
            res.status(401);
            throw new Error("Be kell jelentkezni!");
        }
        

    }
    if(!token){
        res.status(401);
        throw new Error("Be kell jelentkezni!");
    }

});

module.exports={protect};