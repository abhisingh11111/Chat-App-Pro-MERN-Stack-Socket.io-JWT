import mongoose from 'mongoose';

const connecttodb = async()=>{
    try{
        await mongoose.connect(process.env.MongoDB_URI);
        console.log("Connected to DataBase");
    }catch(e){
        console.log('Error connecting to DataBase', e.message);
    }
}

export default connecttodb