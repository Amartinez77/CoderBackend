const { Router } = require("express");
const passport = require("passport");
//const {isAuth} = require("../middleware/passport")
const userRouter = Router();

userRouter.get("/logout", async (req, res, next) => {
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

userRouter.get("/signin", (req, res) => {
  res.render("signin");
});
userRouter.get("/signup", (req, res) => {
  console.log(req.body);
  //sendGmail(req.body);
  //res.redirect("/api");

  res.render("signup");
});
userRouter.get("/logoff", (req, res) => {
  // req.logOut();
  // res.redirect("/api");

  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/api");
  });
});
userRouter.get("/errorlogin", (req, res) => {
  res.render("errorlogin", { message: req.flash("message") });
});
userRouter.get("/errorsignup", (req, res) => {
  res.render("errorsignup", { message: req.flash("message") });
});

// ruta solo de prueba no es pedido en ningun desafio
// userRouter.get("/datos2", (req, res) => {
//   console.log(`port: ${PORT}`);
//   res.send(`servidor levantado en puerto ${srv.address().port}`);
// });

userRouter.post("/login", async (req, res, next) => {
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

userRouter.post(
  "/signin",
  passport.authenticate("login", { failureRedirect: "/api/errorlogin" }),
  (req, res) => {
    req.session.username = req.body.username;
    res.redirect("/api");
  }
);

userRouter.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/api",
    failureRedirect: "/api/errorsignup",
  })
);

userRouter.get("/",  async (req, res, next) => {
   if (req.isAuthenticated()) {
    res.render("form-new-product", { user: req.user.username });
   } else {
    res.render("form-new-product");
   }
});

module.exports = userRouter;
