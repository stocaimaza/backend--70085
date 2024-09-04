/** CLASE 2 - STORAGE **/


//Recordemos: cookies y sessions.

//Instalamos: npm i session-file-store


import express from "express";
const app = express(); 
const PUERTO = 8080;
import session from "express-session"; 
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import {engine} from "express-handlebars";
import sessionRouter from "./routes/session.router.js";
import viewRouter from "./routes/views.router.js";
import "./database.js";

//Trabajamos con persistencia en archivos: 
import FileStore from "session-file-store"; 
const fileStore = new FileStore(session); 
/////////////////////////////////////////////

//Trabajamos con MongoStore: 
//instalamos: npm i connect-mongo
//import MongoStore from "connect-mongo";
///////////////////////////////////////////

//Express-Handlebars: 
app.engine("handlebars", engine());
app.set("view engine", "handlebars"); 
app.set("views", "./src/views");


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); 
app.use(session({
    //1) Creamos una sesion con Memory Storage: 
    secret: "secretCoder", 
    //Es el valor para firmar la cookie. 

    resave: true, 
    //Esto me permite mantener la sesion activa frente a la inactividad del usuario. 

    saveUninitialized: true,
    //Me permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada para contener. 

    //2) Utilizando File Storage: 
    //store: new fileStore({path: "./src/sessions", ttl: 5, retries: 2})
    //Path: la ruta donde se van a guardar los archivitos de session. 
    //ttl: Time To Live! (en segunda va este!)
    //retries: cantidad de veces que el servidor tratara de leer el archivo. 

    //3) Utilizando Mongo Storage: 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://backend70080:coderhouse@cluster0.4fw2i.mongodb.net/Sessiones?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })
}))

//mongodb+srv://backend70080:<db_password>@cluster0.4fw2i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//Rutas de repasito de Cukis: 

//Crear cuki: 
// app.get("/crearcuki", (req, res) => {
//     res.cookie("cuki", "Esto es una cuuuki").send("Cuki seteada!");
// })

//Borrar cuki: 
// app.get("/borrarcuki", (req, res) => {
//     res.clearCookie("cuki").send("Cuki borrada!");
// })

//Rutas para session: 

// app.get("/login", (req, res) => {
//     let usuario = req.query.usuario; 

//     req.session.usuario = usuario; 
//     res.send("Guardamos el usuario por medio de query"); 
// })

// app.get("/usuario", (req, res) => {
//     if(req.session.usuario) {
//         return res.send(`El usuario registrado es el siguiente: ${req.session.usuario}`);
//     }

//     res.send("No tenemos un usuario registrado, vamos a morir");
// })

//HANDS ON LAB

app.use("/api/sessions", sessionRouter);
app.use("/", viewRouter);

app.listen(PUERTO, () => console.log(`Escuchando desde el puerto: ${PUERTO}`));
