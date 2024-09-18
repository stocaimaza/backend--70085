import Router from "./router.js";

class UserRouter extends Router {
    init() {
        //Acá colocamos todas nuestras rutas: 
        this.get("/", (req, res) => {
            //res.send("Get de Users");
            res.sendSuccess("Hola Alumnos, tenemos hambre, ya casi llega la cena"); 
        })
    }
}

export default UserRouter;