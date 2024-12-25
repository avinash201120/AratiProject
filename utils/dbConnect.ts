import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connect() {
  try {
    console.log(process.env.MONGODB_URI);
    mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 10000,
    });
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        `MongoDb connection error .Please make sure MongoDb is running.` + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
