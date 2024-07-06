import dotenv from 'dotenv';
import { app } from './app.js';
import  {connectToDB}  from './db/conn.js';
dotenv.config({
    path: './.env'
});

connectToDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
     console.log("MongoDB connection failed");
})
