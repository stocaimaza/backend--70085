import ProductoModel from "../models/producto.model.js";

class MongoDbJugueteDAO {
    async crearJuguete(datosJuguete) {
        try {
            const juguete = new ProductoModel(datosJuguete);
            return await juguete.save();
        } catch (error) {
            throw new Error("Error al crear el juguete en MongoDB"); 
        }
    }

    async obtenerJuguetes() {
        try {
            return await ProductoModel.find(); 
        } catch (error) {
            throw new Error("Error al obtener los juguetes desde MongoDB"); 
        }
    }

}

export default MongoDbJugueteDAO; 