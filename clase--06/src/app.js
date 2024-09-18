/** CLASE 6 - RUTEO AVANZADO **/

//Temas de hoy: 

//1) Expresiones regulares
//2) Restringiendo parámetros. 
//3) Validacion de parámetros. 
//4) Custom Router. 
//5) Custom Response. 

//Expresiones Regulares: son herramientas que nos permiten validar diferentes patrones en algunas cadenas de texto. 
//Por ejemplo: validar si el texto ingresado por el usuario corresponde a un email con este formato : "nombre@dominio.com"

//Ejemplo con correo electronico: 

let correoIngresado = "lionel@messi.com"; 
let correoFalso = "tinkiwinki"; 

const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(patronCorreo.test(correoIngresado)); 
console.log(patronCorreo.test(correoFalso));


//Ejemplo con un número de telefono: 

let telefonoIngresado = "(223) 669-1111";
let numeroFalsete = "1234";
//Verifica si el dato ingresdo coincide con este formato: (xxx) xxx-xxxx

const patronTelefono = /\(\d{3}\) \d{3}-\d{4}/;

console.log("Verificamos un tel: " + patronTelefono.test(numeroFalsete));

////Levantamos un servidor: 

import express from "express";
const app = express(); 
const PUERTO = 8080;
import clientesRouter from "./routes/clientes.router.js"; 
////Custom Router: 
import UserRouter from "./routes/users.router.js";
const userRouter = new UserRouter(); 


//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

//Rutas
app.use("/clientes", clientesRouter);

//Custom Router: 
app.use("/users", userRouter.getRouter());

app.listen(PUERTO, () => {
    console.log(`Escuhando en el puerto: ${PUERTO}`); 
})


//¿Que hacemos cuando no coincide ninguna ruta?

// app.all("*", (req, res) => {
//     res.status(404).send("Recurso no encontrado, tenes un 8"); 
// })