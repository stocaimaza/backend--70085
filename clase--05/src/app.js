/** CLASE 5 -- PASSPORT AVANZADO  **/

//npm i express cookie-parser jsonwebtoken passport

//JSONWEBTOKEN es una implementación SIN ESTADO que me permite mantener el ciclo de vida del la sesión del usuario. 

//¿Como funciona? 

//1) El servidor genera un token y se lo envia al cliente (navegador).
//2) El navegador almacena ese token y lo envia en cada request por medio de los headers. 
//3) El servidor recibe las peticiones, busca el token de JWT en los headers, si lo encuentra procede con la solicitud, sino pide autenticar nuevamente. 

//Levantamos un mini serveeeer, ah re loco! 
import express from "express"; 
import cookieParser from "cookie-parser";
const app = express();
const PUERTO = 8080; 
import passport from "passport";
import initializePassport from "./config/passport.config.js";

//JSONWEBTOKEN
import jwt from "jsonwebtoken"; 
import { passportCall, authorization } from "./utils/util.js";

//Middleware
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public")); 
app.use(passport.initialize()); 
initializePassport(); 


//Rutas

app.post("/login", (req, res) => {
    let {usuario, pass} = req.body; 

    if( usuario === "tinki"  && pass === "winki") {
        //Si coinciden las credenciales que me envia el cliente, creamos el token: 

        let token = jwt.sign({usuario, pass, role:"admin"}, "coderhouse", {expiresIn: "24h"}); 
        // res.send({messge: "Todo bien!", token});

        //Enviamos desde cookies!
        res.cookie("coderCookieToken", token, {
            maxAge: 60*60*1000, 
            httpOnly: true
        }).send({message: "Login exitosoooo!"});
        //La opcion HTTP Only es una medida de seguridad que indica que la cookie solo se puede acceder desde el protoco HTTP y no mediante JS en el navegador. 
        //60*60*1000 representa una hora en milisegundos. 
    } else {
        res.send("No coincide nada, todo es falso, todo es mentira"); 
    }
})

//Creamos la ruta "current". 

// app.get("/current", passport.authenticate("jwt", {session: false})  ,(req, res) => {
//     res.send(req.user); 
// })

//Usando el PassportCall: 

app.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
    res.send(req.user); 
})


app.listen(PUERTO, () => console.log("Escuchando en el puerto 8080"));