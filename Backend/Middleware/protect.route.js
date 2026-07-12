import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';
import { request } from 'express';

const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorised-no Token Provided"});
        }

        const decode = jwt.verify(token,process.env.JWT_Security_Key);

        if(!decode){
            return res.status(401).json({message:"Invalid Token"});
        }

        const user = await User.findById(decode.userId).select("-password");

        request.user = user;

        next();
    }
    catch(e){
        res.status(500).json({message: "Some error Occur in Protect Route"});
        console.log("Some erroe Occur in Protect Route", e.message);
    }

};

export default protectRoute