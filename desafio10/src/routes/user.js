import express from "express";
const router = express.Router();
import session from "express-session";

router.get('/login', async (req, res) => {
  if (req.session.login) {
    res.redirect('/api/usuario')
  } else {
    res.render('pages/login', {status:false})
  }
})

router.post('/login', async (req, res) => {
  const { user, pass } = req.body;
  //valido un usuario harcodeado
  if (user === 'ariel' && pass === '123456') {
    req.session.login = true;
    res.redirect('/api/usuario')
  } else {
    req.session.login = false;
    res.redirect('/api/usuario/login')
  }
})

router.get('/', async (req, res) => {
  res.render('pages/home', {status: req.session.login})
})

router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json(err)
    } else {
      res.render('pages/logout', {status: false})
    }
  })
})

export default router;
