/** CLASE 4 -  **/

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
import passport from "passport";
import initializePassport from "./config/passport.config.js";

//Express-Handlebars: 
app.engine("handlebars", engine());
app.set("view engine", "handlebars"); 
app.set("views", "./src/views");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); 
app.use(session({
    secret: "secretCoder", 
    resave: true, 
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://backend70080:coderhouse@cluster0.4fw2i.mongodb.net/Sessiones?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })
}))

//Cambios con passport: 
initializePassport(); 
app.use(passport.initialize()); 
app.use(passport.session()); 

app.use("/api/sessions", sessionRouter);
app.use("/", viewRouter);

app.listen(PUERTO, () => console.log(`Escuchando desde el puerto: ${PUERTO}`));
