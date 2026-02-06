import mongoose from "mongoose";

const connectDb = async () => {
  try {
     console.log("Connecting to:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (error) {
    console.error("db connection failed", error.message);
    process.exit(1);
  }
};

export default connectDb;
