/** CLASE 00 - BACKEND 2  **/
//Nivelacion y repaso. 

import express from "express";
import { engine } from "express-handlebars";
const app = express(); 
const PUERTO = 8080;
import "./database.js";
import todoRouter from "./routes/todo.router.js";

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public")); 

//Motor de plantillas
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views");

//Rutas
app.use("/", todoRouter);


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`); 
})