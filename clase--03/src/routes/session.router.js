import { Router } from "express";
const router = Router();
import UserModel from "../model/usuario.model.js";
import { createHash, isValidPassword } from "../utils/util.js";
import passport from "passport";

//Rutita para registrar un usuario y guardarlo en MondongoDB: 

// router.post("/register", async (req, res) => {
//     const { first_name, last_name, email, password, age } = req.body;

//     try {
//         //Verificamos si el email ya esta registrado: 
//         const existeUsuario = await UserModel.findOne({ email: email });

//         if (existeUsuario) {
//             return res.status(400).send("El correo electronico ya esta registrado");
//         }

//         //Si el email nunca fue usado, puedo registrar un nuevo usuario: 
//         const nuevoUser = await UserModel.create({
//             first_name,
//             last_name,
//             email,
//             password: createHash(password),
//             age
//         })

//         //Almacenamos los datos del usuario en la sesión: 
//         req.session.user = {
//             first_name: nuevoUser.first_name,
//             last_name: nuevoUser.last_name,
//             email: nuevoUser.email,
//             age: nuevoUser.age
//         }

//         req.session.login = true; 

//         //res.status(200).send("Usuario creado con exito!");
//         res.redirect("/profile");

//     } catch (error) {
//         res.status(500).send("Error tragico del servidor");
//     }
// })


//VERSION PARA PASSPORT: 

router.post("/register", passport.authenticate("register", {failureRedirect:"/api/sessions/failedregister"})  ,async(req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age, 
        email: req.user.email
    }

    req.session.login = true;
    res.redirect("/profile");
})

router.get("/failedregister", (req, res) => {
    res.send("Registro fallido");
})

//Rutita para hacer el login: 

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         //Primero verificamos el email: 
//         const usuario = await UserModel.findOne({ email: email });

//         if (usuario) {
//             //Si encuentro al usuario, ahora verifico la contraseña: 
//             //if (usuario.password === password) {
//             if(isValidPassword(password, usuario)){
//                 req.session.user = {
//                     first_name: usuario.first_name,
//                     last_name: usuario.last_name,
//                     email: usuario.email,
//                     age: usuario.age
//                 }

//                 req.session.login = true; 
//                 res.redirect("/profile"); 
//             } else {
//                 res.status(401).send("Password incorrecto, ladron! vete malvado!");
//             }
//         } else {
//             res.status(404).send("Usuario no encontrado, quien te conoce papa?"); 
//         }

//     } catch (error) {
//         res.status(500).send("Error interno del server"); 
//     }
// })

//VERSION PARA PASSPORT: 

router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/faillogin"}) ,async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age, 
        email: req.user.email
    }

    req.session.login = true;
    res.redirect("/profile");
})

router.get("/faillogin", async (req, res) => {
    res.send("Error fallo todo vamos a re morir");
})



//Rutita para desloguear: 

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy(); 
    }
    res.redirect("/login"); 
})



export default router;