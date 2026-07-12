import bcrypt from 'bcryptjs';

import User from "../Models/user.model.js";
import generateTokenandSetCookies from '../util/generateToken.js';

export const signup = async(req,res)=>{
    try{
        const {fullname,username,password,confirmpassword,gender}= req.body;

        if(password !== confirmpassword){
            return res.status(400).json({error:"Passwords Does not match"});
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(403).json({error:"Username Already Exist"});
        }

        // Hashing Pending;
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password,salt);
        console.log(hashpass);

        // Profile Pic API
        // https://avatar.iran.liara.run/public/boy?username=
        // https://avatar.iran.liara.run/public/girl?username=

        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newuser = await User({
            fullname,
            username,
            password:hashpass,
            gender,
            profilepic: gender==='Male'? boyPic:girlPic
        });

        if(newuser){
            // JWT Tocken
            generateTokenandSetCookies(newuser._id,res);

            await newuser.save();

            res.status(201).json({
                _id: newuser._id,
                fullname: newuser.fullname,
                username: newuser.username,
                password: newuser.password,
                gender: newuser.gender,
                profilepic: newuser.profilepic,
                created_at: newuser.createdAt,
                updated_at: newuser.updatedAt
            });
        }
        else{
            res.status(400).json({error: "Invalid User Data"});
        }
    }
    catch(err){
        console.log("Error in signup controller ", err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
    // res.send("signup"); 
    console.log("signup");
}

export const login = async (req,res)=>{

    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const pass = await bcrypt.compare(password,user?.password||'');
        if(!user || !pass){
            return res.status(400).json({error: "Invalid Username or Password"});
        }

        generateTokenandSetCookies(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: res.fullName,
            username: user.username,
            password: user.password,
            gender: user.gender,
            profilepic: user.profilepic
        });

    }
    catch(err){
        console.log("Error in Login controller ", err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
    // res.send("login");
    console.log("login");
}

export const logout = (req,res)=>{
    try{
        res.cookie('jwt','',{maxAge:0});
        res.status(200).json({message: "Loged Out Successfully"});
    }
    catch(err){
        console.log("Error in Logout controller ", err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
    console.log("logout");
}