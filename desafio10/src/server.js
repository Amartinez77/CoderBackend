import dotenv from "dotenv"
dotenv.config();
import express from "express";
import mongoStore from "connect-mongo";
import path from "path";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import session from "express-session";

 import userRouter from "./routes/user.js";
//const userRouter = require("./routes/user.js").default;

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));

app.set('views', '../src/views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}))


const user = 'usuario1';
const pass = 'abc123456'

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: `mongodb+srv://${user}:${pass}@cluster0.crzm5b3.mongodb.net/baseTest`,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "mensaje oculto",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }, // 10MIN
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/usuario', userRouter);

const server = app.listen(PORT, () => {
  console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));