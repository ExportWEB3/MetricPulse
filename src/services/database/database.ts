import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);

    console.log(`Connected to the database`);
  } catch (error) {
    console.error(`Error connecting to database, ${error}`);
    process.exit();
  }
};

export default connectDB;
