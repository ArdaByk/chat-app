import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected: ", conn.connection.host);
    } catch(err) {
        console.error("Error connection to MONGODB: ", err);
        process.exit(1);
    }
}