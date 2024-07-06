import mongoose from "mongoose";


export async function connectToDB(){
    try {
        const dbConnection = await mongoose.connect(`${process.env.MONGODB_URL}`);

        dbConnection.connection.on('connected', () => {
            console.log("Connected to database");
        });

        dbConnection.connection.on('disconnected', () => {
            console.log("Disconnected from database");
        });

        dbConnection.connection.on('error', (error) => {
            console.error("Mongoose connection error:", error);
        });
        return dbConnection;
        
    } catch (error) {
        console.log("MONGODB connection Error",error);
        process.exit(1);
    }
   
}



