import express from "express"; 
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
const app = express();
const PUERTO = 8080;
import "./database.js";
import usuarioRouter from "./routes/usuario.router.js";
import viewsRouter from "./routes/views.router.js"; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());
initializePassport(); 
app.use(passport.initialize()); 

//Express-Handlebars
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Rutas
app.use("/api/sessions", usuarioRouter); 
app.use("/", viewsRouter); 

app.listen(PUERTO, () => {
    console.log(`Puerto: ${PUERTO}`);
})