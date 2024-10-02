// import mongoose from "mongoose";
// import configObject from "./config/config.js";
// const {mongo_url} = configObject; 

// mongoose.connect(mongo_url)
//     .then(() => console.log("Todo bien!"))
//     .catch((error) => console.log("Todo mal!", error) )


///////////////////////////////////////////////////////////////////////

//3) Patron de diseño Singleton: 
//Lo usamos para tener una instancia global en toda la aplicación. 

import mongoose from "mongoose";
import configObject from "./config/config.js";
const {mongo_url} = configObject; 

class BaseDatos {
    static #instancia; 
    //Se eclara una variable estática y privada llamada "instancia". 

    constructor() {
        mongoose.connect(mongo_url); 
    }

    static getInstancia() {
        if(this.#instancia) {
            console.log("Conexion previa"); 
            return this.#instancia; 
        }

        this.#instancia = new BaseDatos(); 
        console.log("Conexion exitosa"); 
        return this.#instancia;
    }
}

export default BaseDatos; 
