import JugueteService from "../services/juguete.services.js"
const jugueteServices = new JugueteService(); 

class ViewController {
    async mostrarJuguetes(req, res) {
        try {
            const juguetes = await jugueteServices.obtenerJuguetes(); 
            res.render("index", {juguetes});
        } catch (error) {
            res.status(500).send("Error terriiiibleeeee");
        }
    }
}

export default ViewController