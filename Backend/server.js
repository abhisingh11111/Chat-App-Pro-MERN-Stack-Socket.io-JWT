// Modules
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

// Routes
import authRouter from './Routes/auth.routes.js';
import messageRouter from './Routes/message.routes.js';
import userRouter from './Routes/user.routes.js';

// DataBase
import connecttodb from './DB/connect.js';


dotenv.config();
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve()

// const app = express();

import { app, server } from './Socket/socket.js';

// app.post('/', (req,res)=>{
//     res.send("Abhiraj is Great");
// });

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend','dist','index.html'))
})

server.listen(PORT,()=>{
    connecttodb()
    console.log(`Server Listening at port https://localhost:${PORT}`);
});