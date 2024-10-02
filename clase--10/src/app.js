/** CLASE 10 -  ARQUITECTURA DEL SERVIDOR: DISEÑO **/

//Temas de hoy: 
//1) Punto de partida al desarrollar un servidor. 
//2) Patrones de diseño. 
//3) Singleton para nuestra conexión con MongoDB. 
//4) Comunicación entre el front y el backend. 

//1) Punto de partida: Consejitos de Mauri

//Codigo reutilizable. 
//Pensar en código escalable
//Homologación de patrones de diseño. 

//Levantamos un servidor: 

import express from "express";
import productosRouter from "./routes/producto.router.js"; 
const app = express(); 
const PUERTO = 8080; 
//Cors: 
//Instalamos: npm i cors
import cors from "cors"; 

//Singleton: 
import BaseDatos from "./database.js"; 
const instanciaBD = BaseDatos.getInstancia(); 


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public")); 
app.use(cors()); 

//Rutas
app.use("/productos", productosRouter); 

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto de Mar del Plata`); 
})




