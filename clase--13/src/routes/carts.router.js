import express from "express";
const router = express.Router();

//Importamos el controlador: 
import CartController from "../controllers/cart.controller.js";
const cartController = new CartController(); 

router.post("/", cartController.create); 
router.get("/:cid", cartController.getCart); 
router.post("/:cid/product/:pid", cartController.addProductToCart); 

export default router;
