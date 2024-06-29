import dotenv from 'dotenv';
import { app } from './app.js';
import  {connectToDB}  from './db/conn.js';
dotenv.config();

connectToDB()

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})