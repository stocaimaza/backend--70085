import { Router } from "express";
const router = Router(); 

// router.get("/nombre/:cliente([a-z]+)", (req, res) => {
//     //En esta situacion yo estoy esperando un parametro por la URL, el nombre de un cliente.

//     //¿Que ocurre si el cliente ingresa solo numeros o caracteres especiales en lugar de palabras? 

//     //Para solucionar este problema y recibir solo los parametros esperados podemos usar las expresiones regulares

//     let cliente = req.params.cliente; 

//     res.send("Cliente: " + cliente);
// })


//Otra forma de hacerlo: 

router.get("/email/:email", (req, res) => {
    let email = req.params.email; 
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(patronCorreo.test(email)) {
        res.send("Email valido: " + email); 
    }else{
        res.send("Email invalido"); 
    }
})


//VALIDANDO PARAMETROS: 

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    
    res.send("Obteniendo un recurso a partir del param cliente: " + req.params.cliente);
})

router.post("/nombre/:cliente([a-z]+)", (req, res) => {
    
    res.send("Enviando un recurso a partir del param cliente");
})

router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    
    res.send("Actualizando un recurso a partir del param cliente");
})


router.delete("/nombre/:cliente([a-z]+)", (req, res) => {
    
    res.send("Eliminando un recurso a partir del param cliente");
})

//Nos encontramos que en los 4 métodos hay lineas de codigo que son igual y operaciones que se repiten: 
//a) Obtener el parametro "cliente"
//b) Buscar el paramtro dentro de una base de datos. 
//C) Una vez validado, continuar con la operacion que corresponda. 

router.param("cliente", (req, res, next, cliente) => {
    const clientes = ["firulais", "lionel", "maxi"]; 

    if(clientes.includes(cliente)) {
        req.cliente = cliente; 
        next(); 
    } else {
        res.status(404).send("Cliente no encontrado"); 
    }

})


export default router; 