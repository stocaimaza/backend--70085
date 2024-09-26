//Este Service podria ser el punto de conex con MongoDB: 
import JugueteModel from "../models/juguete.model.js"; 

class JugueteService {
    async crearJuguete(datosJuguete) {
        try {
            const juguete = new JugueteModel(datosJuguete); 
            return await juguete.save(); 
        } catch (error) {
            throw new Error("Error al crear un juguete"); 
        }
    }

    async obtenerJuguetes(){
        try {
            return await JugueteModel.find().lean(); 
        } catch (error) {
            throw new Error("Error al obtener todos los juguetes"); 
        }
    }
}


export default JugueteService; 
