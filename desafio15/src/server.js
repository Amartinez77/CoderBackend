import express from "express";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import userRouter from "./routes/user.route.js";
import otherRouter from "./routes/other.route.js";
import session from "express-session";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import compression from "compression";
import minimist from "minimist";
import logger from "./utils/loggers/Log4jsLogger.js";
import loggerMiddleware from "./middlewares/routesLogger.middleware.js";

///////


import { SECRET, MONGO_URI } from "./configs/db.config.js";
console.log(MONGO_URI)

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(loggerMiddleware);
app.use(express.static("public"));
app.use(compression());

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index",
    //layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");


// app.use(
//   session({
//     store: mongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//       options: {
//         useNewUrlParser: true, // Corregido
//         useUnifiedTopology: true,
//       },
//     }),
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 600000 }, // 10 min.
//   })
// );

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://usuario1:abc123456@cluster0.crzm5b3.mongodb.net/baseTest",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const sessionStore = MongoStore.create({
  mongoUrl:
    "mongodb+srv://usuario1:abc123456@cluster0.crzm5b3.mongodb.net/baseTest",
});

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/usuario", userRouter);
app.use("/test", otherRouter);

app.all("*", (req, res) => {
  res.status(404).json({ error: "ruta no existente" });
});

/* --------------- Leer el puerto por consola o setear default -------------- */

const options = {
  alias: {
    p: "PORT",
  },
  default: {
    PORT: 8080,
  },
};

app._router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});

const { PORT } = minimist(process.argv.slice(2), options);

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server started at http://localhost:${PORT}`);
});

server.on("error", (err) => logger.error(err));
