import mongoose from "mongoose";

const connectDB = (uri) => {
  try {
    mongoose.connect(uri);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
