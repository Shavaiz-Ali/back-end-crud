import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected successfully");
    } catch (error) {
        console.error("could't connect to db:", error.message);
    }
};

export default connectDb;
