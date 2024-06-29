import dotenv from 'dotenv';
import connectDB from './db/conn.js'
import { app } from './app.js';
dotenv.config({path: './env'});


app.listen(process.env.PORT|| 3000,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})