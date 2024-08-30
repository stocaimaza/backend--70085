/** CLASE 01 - COOKIES Y SESSIONS **/

//Cookies: son archivos de texto que viven en el navegador del usuario y almacenan información para mejorar la experiencion de navegacion. 

//Caracteristicas: 

//1- A las cookies se le puede asignar un tiempo de vida. 
//2- El espacio de guardado es limitado. 
//3- Podemos asignarles claves secretas para poder aumentar la seguridad
//4- Viven en el navegador, así que no guardamos datos sensibles

//Instalamos cookie-parser: 
//npm install cookie-parser

//Sessions: esto nos permite conseguir un vinculo entre el cliente y el servidor, y mantener identificado al usuario. 

//Instalamos: npm i express-session

//Caracteristicas: 
//a) La informacion se guarda del lado del servidor. 
//b) Del lado del cliente se crea un identificador para poder acceder a esa informacion. 
//c) Los datos almacenados se borran al cerrar el navegador. 
//d) Se usa principalmente para datos de usuarios al iniciar sesion. 



//Configuramos un servidor: 

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
//No se olviden de usar cookieParser!
const miAltaClaveSecreta = "TinkiWinki";
app.use(cookieParser(miAltaClaveSecreta));
//Session: 
app.use(session({
    secret: "secretCoder", 
    resave: true, 
    //Esta configuracion me permite mantener activa la sesion frente a la inactividad del usuario. 
    saveUninitialized: true
    //Me permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada para contener. 
}))


//Rutas:

app.get("/", (req, res) => {
    res.send("Hola Mundo!"); 
})

//Setear una cookie: 

app.get("/setcookie", (req, res) => {
    //Usaremos el objeto "res" para asignarle una cookie al cliente
    //Lo almacenamos en formato clave - valor. 
    // res.cookie("coderCookie", "Mi primera chamba con cookies").send("Cookie seteada correctamente! ahhh  re locoo"); 

    res.cookie("coderCookie", "ahora tenemos un poco de seguridad", {signed: true, maxAge: 300000000000}).send("Cookie seteada con firma y tiempo de vida");

})

//Leemos el valor de una cookie: 

app.get("/leercookie", (req, res) => {
    res.send(req.cookies);
})

//Borrar una cookie: 

app.get("/borrarcuki", (req, res) => {
    res.clearCookie("coderCookie").send("Cookie eliminada"); 
})

//Obtenemos una cookie firmada: 

app.get("/recuperamoscookiefirmada", (req, res) => {
    //Atentis, para recuperar una cookie firmada tenemos que usar el método: 
    let valorCookie = req.signedCookies.coderCookie;

    if(valorCookie) {
        res.send("Cookie firmada recuperada: " + valorCookie);
    } else {
        res.send("Cookie invalida");
    }
})

//Contador con Session: 

app.get("/session", (req, res) => {
    //Lo vamos a almacenar en el req.session
    if(req.session.counter) {
        req.session.counter++; 
        res.send("Visitaste este sitio: " + req.session.counter + " veces"); 
    } else {
        req.session.counter = 1; 
        res.send("Bienvenido al club! "); 
    }
})

//Login con session: 

app.get("/login", (req, res) => {
    let {usuario, pass} = req.query; 

    if(usuario === "tinki" && pass === "winki") {
        req.session.user = usuario; 
        res.send("Inicio de sesion exitoseshon, Viva!!!" );
    } else {
        res.send("Datos incorrectos, vete hacker malvado de mi vida!"); 
    }
})

//Ruta privada para la gente que paso por el login: 

//Middleware de autenticacion: 

function auth(req, res, next) {
    if(req.session.user === "tinki") {
        return next();
    }
    return res.status(401).send("Error"); 
}


app.get("/privado", auth , (req, res) => {
    res.send("Si llegas aca es porque te logueaste correctamente"); 
})

//Eliminamos datos de la session: 

app.get("/logout", (req, res) => {
    req.session.destroy( (error) => {
        if(!error) res.send("Sesion cerrada"); 
        else res.send({status: "error", body: error})
    })
})


//Listen: 

app.listen(PUERTO, () => {
    console.log(`Escuchando en el Puerto de Mar del Plata`);
})

