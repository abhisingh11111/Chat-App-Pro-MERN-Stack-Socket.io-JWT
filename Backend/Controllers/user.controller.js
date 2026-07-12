import User from "../Models/user.model.js";

export const getUserforSidebar = async (req,res)=>{
    try{
        const logedInUsers = req.user._id;

        const allUsers = await User.find({_id: {$ne: logedInUsers}}).select("-password");

        return res.status(200).json(allUsers);
    }
    catch(e){
        console.log("Some Error Occure in User Controller", e.message);
        res.status(404).json({error: "Some Error Occure in User Controller"});
    }
}