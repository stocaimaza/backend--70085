import express from "express";
const router = express.Router();

import ProductController from "../controllers/product.controller.js"; 
const productController = new ProductController(); 

router.get("/", productController.getProducts); 
router.get("/:id", productController.getProductById);
router.get("/", productController.createProduct);
router.put("/:id", productController.updateProduct); 
router.delete("/:id", productController.deleteProduct); 

export default router; 
