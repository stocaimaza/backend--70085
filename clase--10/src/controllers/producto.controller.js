//Importaremos el ProductoModel: 
import ProductoModel from "../models/producto.model.js";

//Importamos respuesta: 
import { respuesta } from "../utils/reutilizable.js";

class ProductoController {
    async getProductos(req, res) {
        try {
            const productos = await ProductoModel.find(); 
            respuesta(res, 200, productos); 
        } catch (error) {
            respuesta(res, 500, "Error al obtener productos")
        }
    }

    async postProducto(req, res) {
        try {
            const nuevoProducto = req.body; 
            await ProductoModel.create(nuevoProducto); 
            respuesta(res, 201, "Producto creado exitosamente"); 
        } catch (error) {
            respuesta(res, 500, "Error al crear producto, ahh todo mal")
        }

    }
}


export default ProductoController; 