import Conversation from "../Models/conversation.model.js";
import Message from "../Models/message.model.js";
import { getReciverSocketId, io } from "../Socket/socket.js";

export const sendMessage = async (req,res)=>{
    try{
        const {message} = req.body;
        const {id : reciverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId,reciverId]},
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,reciverId],
            }); 
        }

        const newmessage = new Message({
            senderId,
            reciverId,
            message
        });

        if(newmessage){
            conversation.messages.push(newmessage._id);
        }

        await conversation.save();
        await newmessage.save();

        // await Promise.all(conversation.save(), newmessage.save());

        const reciverSocketId = getReciverSocketId(reciverId)
        if(reciverSocketId){
            io.to(reciverSocketId).emit('newMessage',newmessage)
        }

        res.status(201).json(newmessage);
    }
    catch(e){
        console.log("Some Erroe Occur in Message Controller ", e.message);
        res.status(500).json({error: "Some Erroe Occur in Message Controller"});
    }
    console.log("message Sent",req.params.id);
    // res.status(200).json({
    //     message: "Message Sent Successfullu",
    //     SenderID: req.params.id
    // });
}

export const getMessage = async (req, res) => {
    try{
        const {id:reciverId} = req.params;
        const senderId =  req.user._id;
        const conversation = await Conversation.findOne({
            participants: {$all:[senderId,reciverId]},
        }).populate("messages");

        if(!conversation)
            return res.status(200).json([]);

        res.status(200).json(conversation.messages);
    }
    catch(e){
        console.log("Some Erroe Occur in get Message Controller ", e.message);
        res.status(500).json({error: "Some Erroe Occur in get Message Controller"});
    }
    // console.log("message Sent",req.params.id);
}