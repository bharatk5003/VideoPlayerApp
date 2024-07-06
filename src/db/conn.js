import mongoose from "mongoose";

export async function connectToDB() {
  try {
    const dbConnection = await mongoose.createConnection(
      `${process.env.MONGODB_URL}`
    );

    dbConnection.on("connected", () => {
      console.log("connected to database");
    });

    dbConnection.on("disconnected", () => {
      console.log("Disconnected");
    });
    return dbConnection;
  } catch (error) {
    console.log("MONGODB connection Error", error);
    process.exit(1);
  }
}
