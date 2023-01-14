const { MONGOURL } = require("../config");
const mongoose = require("mongoose");

const user = "usuario1";
const pass = "abc123456";
mongoose.set("strictQuery", false);
const connection = mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("[Mongoose] - connected in:", process.env.MONGODB_URL);
});

mongoose.connection.on("error", (err) => {
  console.log("[Mongoose] - error:", err);
});

module.exports = connection;
