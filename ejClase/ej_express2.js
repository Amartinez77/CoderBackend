import Express from "express";

const { Router } = Express;

const app = express();
const routerMascotas = Router();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

let mascotas = [{nombre: 'firulais', edad: 3}]

app.use("/mascotas", routerMascotas);

routerMascotas.get ("/", (req, res => {}))