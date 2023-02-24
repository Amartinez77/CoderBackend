import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "../utils/loggers/Log4jsLogger.js";
import yargs from "yargs/yargs";

//import { MONGO_URI } from "../";

dotenv.config();

const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
const ADMIN_NUMBER = process.env.ADMIN_NUMBER;

const GMAILACCOUNT = process.env.GMAIL_ACCOUNT;
const GMAILPASSWORD = process.env.GMAIL_PASSWORD;

const SECRET = process.env.SECRET;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    err
      ? logger.error("⛔ Error al conectarse a MongoDB")
      : logger.info("🆗 Conectados a MongoDB");
  }
);

mongoose.connection.on("connected", () => {
  console.log("[Mongoose] - connected in:", process.env.MONGODB_URL);
});

mongoose.connection.on("error", (err) => {
  console.log("[Mongoose] - error:", err);
});




export  { mongoose, GMAILACCOUNT, GMAILPASSWORD, SECRET, MONGO_URI };
