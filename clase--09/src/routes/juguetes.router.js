import { Router } from "express";
const router = Router(); 

//Voy a importar el controlador. 
import JugueteController from "../controllers/juguete.controller.js";
const jugueteController = new JugueteController(); 
// Y voy a conectar los endpoint con los métodos correspondientes. 

router.post("/", jugueteController.crearJuguete); 
router.get("/", jugueteController.obtenerJuguetes); 


export default router; 