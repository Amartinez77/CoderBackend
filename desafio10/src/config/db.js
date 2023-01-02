import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.crzm5b3.mongodb.net/baseTest`,
  (err) => {
    err
      ? console.log("⛔ Error al conectarse a MongoDB")
      : console.log("🆗 Conectados a MongoDB");
  }
);

export default mongoose;