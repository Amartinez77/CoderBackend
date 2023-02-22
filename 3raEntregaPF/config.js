const yargs = require("yargs/yargs")(process.argv.slice(2));
require("dotenv").config();

const MONGOURL = process.env.MONGOURL;
const PORT = yargs
  .alias({
    p: "puerto",
    m: "modo",
  })
  .default({
    puerto: 8080,
    modo: "FORK",
  }).argv;

const ADMIN_MAIL = process.env.ADMIN_MAIL;
const ADMIN_PASS = process.env.ADMIN_PASS;

const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
const ADMIN_NUMBER = process.env.ADMIN_NUMBER;

module.exports = { MONGOURL, PORT, ADMIN_MAIL, ADMIN_PASS, TWILIO_SID, TWILIO_TOKEN, ADMIN_NUMBER};
