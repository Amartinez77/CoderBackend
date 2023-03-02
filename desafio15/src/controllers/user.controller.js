import { UsuarioService } from "../services/usuario.service.js";
import passport from "passport"
import { sendGmail } from "../utils/notifications/gmail/EmailSender.js";
import { htmlNewUserTemplate } from "../utils/notifications/gmail/htmltemplates/NewUserCreatedTemplate.js";

const usuarioService = new UsuarioService();

export async function logInView(req, res) {
  if (req.session.login) {
    res.redirect("/api/usuario");
  } else {
    res.render("login", { status: false });
  }
}

export async function signUpView(req, res) {
  if (req.session.login) {
    res.redirect("/api/usuario");
  } else {
    res.render("signup", { status: false });
  }
}

export async function signUp(req, res) {
  const { body } = req;
  const newUser = await usuarioService.createUser(body);

  if (newUser) {
    // Descomentar si has llenado el .env con tu email y password de Gmail.
    
        // const now = new Date();
        // const newUserTemplateEmail = htmlNewUserTemplate(newUser._id, now.toLocaleString());
        // await sendGmail('Nuevo usuario creado', newUserTemplateEmail);
    
    res.redirect("/api/usuario");
    //res.status(200).json({ success: "User added with ID " + newUser._id });
  } else {
    res
      .status(400)
      .json({
        error:
          "there was an error, please verify the body content match the schema",
      });
  }
}

export async function logIn(req, res, next) {
  // const { user, pass } = req.body;

  console.log(req.body.user)
  // const loggedUser = await usuarioService.loginUser({
  //   username: user,
  //   password: pass,
  // });

  // if (loggedUser) {
  //   req.session.login = true;
  //   res.redirect("/api/usuario");
  // } else {
  //   req.session.login = false;
  //   res.redirect("/api/usuario/login");
  // }

  passport.authenticate("local", function (err, user, info) {
    console.log(user)
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(user)
      return res.redirect("/api/usuario/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/api/usuario");
    });
  })(req, res, next);

}

export async function homeView(req, res) {
  res.render("home", { status: req.session.login });
}

export async function logOutView(req, res) {
  if (!req.session.login) {
    res.redirect("/api/usuario");
  } else {
    req.session.destroy((err) => {
      if (err) {
        res.json(err);
      } else {
        res.render("logout", { status: false });
      }
    });
  }
}
