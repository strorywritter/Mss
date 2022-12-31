import mongoose from "mongoose";
import "dotenv/config";

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const dbConnect = mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const connection = mongoose.connection;

    connection.once("open", () => {
    });
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
