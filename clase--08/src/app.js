/** CLASE 8 - PROCESS, GLOBAL & CHILD PROCESS **/

//Temas de hoy: 
//1) Objeto Process
//2) Manejo de argumentos
//3) Commander JS
//4) Manejo de variables de entorno
//5) Listeners
//6) Child Process

//////////////////////////////////////////////////////////

//Cada vez que yo ejecuto "node app.js" se crea automaticamente un objeto llamado "process", que contiene información soblre el proceso. 

//console.log(process); 

//Algunos elementos importantes: 

//console.log(process.cwd()); 
//Directorio actual del proceso. 

//console.log(process.pid); 
//Obtengo el id del proceso en el sistema operativo. 

//console.log(process.version); 
//Me va a retornar la version de Node JS

//console.log(process.memoryUsage()); 
//Cantidad de memoria que usa el proceso. 

//process.exit(); 
//Permite salir de proceso. 

//console.log("Texto adicional"); 

//Manejo de Argumentos: 

//process.argv: muestra los argumentos pasados por CLI
//console.log(process.argv); 

/////////////////////////////////////////////

//LEVANTAMOS UN SERVIDOR: 

import express from "express"; 
const app = express(); 
import UserModel from "./models/usuarios.model.js";
import configObject from "./config/config.js";
import mongoose from "mongoose";

const {mongo_url, puerto} = configObject; 

mongoose.connect(mongo_url)
    .then(() => console.log("Conexion exitosa!"))
    .catch((error) => console.log("Vamos a morir!! ahhhhh", error))


//Rutas

app.get("/", async (req, res) => {
    try {
        const usuarios = await UserModel.find(); 
        res.send(usuarios);
    } catch (error) {
        res.status(500).send("Error terribbleeeeee, no puede ser que hiciste eso!!!"); 
    }
})

//Ejercicio Child Process: 

// function operacionCompleja() {
//     let result = 0; 

//     for( let i = 0; i < 5e9; i++ ){
//         result += i; 
//     }
//     return result;
// }

// app.get("/suma", (req, res) => {
//     const result = operacionCompleja(); 
//     res.send(`El resultado de la operacion es: ${result}`); 
// })

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto: ${puerto}`); 
})

//Comenzamos a estructurar el forkeo. 
//1) Separamos la función que trae problemas a otro módulo. 
//2) La modificamos y la dejamos disponible para cuando el padre lo solicite. 
//3) Ejecutamos la ruta. 

import {fork} from "child_process"; 
//No hace falta instalar nada, ya es un proceso nativo. 

app.get("/suma", (req, res) => {
    const child = fork("./src/operacionesComplejas.js"); 
    child.send("Iniciando"); 
    child.on("message", result => {
        res.send(`El resultado de la operacion es ${result}`); 
    })
})



//Listeners: 

// Los eventos me permitian escuchar todo lo que hace el usuario en el navegador, en Node tambien lo podemos hacer escuchando eventos que ocurren durante el proceso de ejecución de la aplicación. 

//process.on() es un método que nos permite registrar escuchadores de eventos (listeners) para eventos especificos en el proceso de ejecucion. 

//Los eventos más usados: 

//exit me permite ejecutar un código justo antes de la finalización del proceso. 

// process.on("exit", (code) => {
//     console.log("Terminamos el proceso con el siguiente código: ", code);
// })


// console.log("Este texto se debe mostrar por consola");

// //Para excepciones no controladas: 

// process.on("uncaughtException", () => {
//     console.log("Tuvimos que capturar un error"); 
//     process.exitCode = 1; 
// })

// firulais(); 
