//Aca vamos a crear los métodos "crearJuguete" y "obtenerJuguetes": 

import JugueteService from "../services/juguete.services.js";
const jugueteServices = new JugueteService(); 

class JugueteController {
    async crearJuguete(req, res) {
        try {
            const juguete = await jugueteServices.crearJuguete(req.body); 
            res.json(juguete); 
        } catch (error) {
            res.status(500).json({error: error.message}); 
        }
    }

    async obtenerJuguetes(req, res) {
        try {
            const juguetes = await jugueteServices.obtenerJuguetes(); 
            res.json(juguetes); 
        } catch (error) {
            res.status(500).json({error: error.message}); 
        }
    }

}

export default JugueteController; 
