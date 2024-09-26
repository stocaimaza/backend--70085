import express from "express";
import "./database.js";
import { engine } from "express-handlebars";
import juguetesRouter from "./routes/juguetes.router.js";
import viewsRouter from "./routes/views.router.js";
const app = express(); 
const PUERTO = 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas 
app.use("/juguetes", juguetesRouter); 
app.use("/", viewsRouter); 



app.listen(PUERTO, () => console.log(`Escuchando en el puerto ${PUERTO}`)); 