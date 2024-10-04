//import MongoDbJugueteDAO from "../dao/mongoDBJugueteDao.js";
//import MemoryJugueteDao from "../dao/memoryJugueteDao.js";
//import FileSystemJugueteDao from "../dao/fileSystemJugueteDao.js";

//Trabajamos con el patron Factory: 
import DAO from "../dao/factory.js";
const jugueteServices = new DAO(); 

//Importamos respuesta: 
import { respuesta } from "../utils/reutilizable.js";

//Trabajamos con un DTO:
import JugueteDTO from "../dto/producto.dto.js";

class ProductoController {
    async getProductos(req, res) {
        try {
            const productos = await jugueteServices.obtenerJuguetes();
            respuesta(res, 200, productos); 
        } catch (error) {
            respuesta(res, 500, "Error al obtener productos")
        }
    }

    async postProducto(req, res) {
        const {nombre, categoria, precio} = req.body; 
        try {
            //Creamos un nuevo JugueteDTO sin necesidad de pasar el fullname: 

            const jugueteDTO = new JugueteDTO(nombre, categoria, precio); 
            const juguete = await jugueteServices.crearJuguete(jugueteDTO); 
            respuesta(res, 201, juguete); 
        } catch (error) {
            respuesta(res, 500, "Error al crear producto, ahh todo mal")
        }

    }
}


export default ProductoController; 