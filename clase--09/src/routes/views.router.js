import { Router } from "express";
const router = Router(); 

//Importamos y creamos la instancia. 
import ViewController from "../controllers/view.controller.js"; 
const viewsController = new ViewController(); 

router.get("/", viewsController.mostrarJuguetes); 

export default router; 