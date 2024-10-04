
import express from "express";
import productosRouter from "./routes/producto.router.js"; 
const app = express(); 
const PUERTO = 8080; 
//Cors: 
//Instalamos: npm i cors
import cors from "cors"; 
import "./database.js";

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




