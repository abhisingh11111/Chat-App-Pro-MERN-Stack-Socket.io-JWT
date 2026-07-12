import jwt from 'jsonwebtoken';

const generateTokenandSetCookies = (userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_Security_Key,{
        expiresIn:'15d'
    });

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000, //15days
        httpOnly: true, //prevent XSS Attack
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
    });
}

export default generateTokenandSetCookies;