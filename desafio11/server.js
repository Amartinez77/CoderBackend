require("./mongodb/mongooseLoader")
const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const { Socket } = require("socket.io");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { Router } = express;
const apiRouter = Router();
const User = require("./models/user");
const bCrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo");


app.engine(
  "hbs",
  engine({
    defaultLayout: "index",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

const user = "usuario1";
const pass = "abc123456";

app.use(express.static("./public"));
app.use("/api", apiRouter);
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));
apiRouter.use(
  session({
    secret: "AlckejcUi5Jnm3rFhNjUil87",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${user}:${pass}@cluster0.crzm5b3.mongodb.net/baseTest`,
      ttl: 600000,
      autoRemove: "native",
    }),
  })
);

// conecto flash para enviar los mensajes 
const flash = require("connect-flash");
apiRouter.use(flash());

// valido usuarios 

function isValidPassword(user, password) {
  console.log(user, password);
  return bCrypt.compareSync(password, user.password);
}
function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

// configuro passport local 

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          console.log("User Not Found with email " + username);
          return done(
            null,
            false,
            req.flash("message", "Usuario no encontrado.")
          );
        }
        if (!isValidPassword(user, password)) {
          console.log("Invalid Password");
          return done(
            null,
            false,
            req.flash("message", "Contraseña incorrecta")
          );
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }
        if (user) {
          console.log("User already exists with username: " + username);
          return done(
            null,
            false,
            req.flash("message", "El usuario ya se encuentra registrado")
          );
        } else {
          const newUser = new User();
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.save((err) => {
            if (err) {
              console.log("Error in Saving user: " + err);
              throw err;
            }
            console.log("User Registration succesful");
            return done(null, newUser);
          });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

apiRouter.use(passport.initialize());
apiRouter.use(passport.session());


// defino las rutas de inicio login logout


apiRouter.get("/", async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("form-new-product", { user: req.user.username });
  } else {
    res.render("form-new-product");
  }
});

apiRouter.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    const session = req.session.user;
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.json(`Hasta luego ${session}`);
      }
    });
    setTimeout(() => {
      res.redirect("/api");
    }, 2000);
  }
});



apiRouter.get("/signin", (req, res) => {
  res.render("signin");
});
apiRouter.get("/signup", (req, res) => {
  res.render("signup");
});
apiRouter.get("/logoff", (req, res) => {
  req.logOut((err) => {
    res.redirect("/api");
  } );
  
});
apiRouter.get("/errorlogin", (req, res) => {
  res.render("errorlogin", { message: req.flash("message") });
});
apiRouter.get("/errorsignup", (req, res) => {
  res.render("errorsignup", { message: req.flash("message") });
});

apiRouter.post("/login", async (req, res, next) => {
  try {
    if (!req.body.userName) {
      throw new Error("Debe enviar un nombre de usuario");
    }
    req.session.user = req.body.userName;
    req.session.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.json(`Login correcto ${req.session.user}`);
      }
    });
  } catch (error) {
    next(error);
  }
});

apiRouter.post(
  "/signin",
  passport.authenticate("login", { failureRedirect: "/api/errorlogin" }),
  (req, res) => {
    req.session.username = req.body.username;
    res.redirect("/api");
  }
);
apiRouter.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/api",
    failureRedirect: "/api/errorsignup",
  })
);


function handleErrors(err, req, res, next) {
  console.log(err.message);
  res.render("datos", { err });
}
apiRouter.use(handleErrors);




// server

const PORT = process.env.PORT || 8080;
const srv = server.listen(PORT, () => {
  console.log(
    `Servidor Express escuchando peticiones en el puerto ${srv.address().port}`
  );
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));
