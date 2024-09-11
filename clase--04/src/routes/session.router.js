import { Router } from "express";
const router = Router();
import passport from "passport";
import UserModel from "../model/usuario.model.js";
import { createHash, isValidPassword } from "../utils/util.js";
import generateToken from "../utils/jsonwebtoken.js";

///VERSION PARA JSONWEBTOKEN: 

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        const existeUsuario = await UserModel.findOne({ email });

        if (existeUsuario) {
            return res.status(400).send("El email ya esta usado en nuestros registros");
        }

        //Creamos un nuevo usuario: 

        const nuevoUsuario = await UserModel.create({ first_name, last_name, email, password: createHash(password), age });

        //Generamos un token: 

        const token = generateToken({
            first_name: nuevoUsuario.first_name,
            last_name: nuevoUsuario.last_name,
            email: nuevoUsuario.email
        })

        res.status(201).send({ message: "Usuario creado con exito", token });

    } catch (error) {
        res.status(500).send("Error interno del server");
    }
})




//REGISTRO DE USUARIO: 

// router.post("/register", passport.authenticate("register", {failureRedirect:"/api/sessions/failedregister"})  ,async(req, res) => {
//     req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         age: req.user.age, 
//         email: req.user.email
//     }

//     req.session.login = true;
//     res.redirect("/profile");
// })

router.get("/failedregister", (req, res) => {
    res.send("Registro fallido");
})

//LOGIN: 

// router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/faillogin"}) ,async (req, res) => {
//     req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         age: req.user.age, 
//         email: req.user.email
//     }

//     req.session.login = true;
//     res.redirect("/profile");
// })

router.get("/faillogin", async (req, res) => {
    res.send("Error fallo todo vamos a re morir");
})

///VERSION PARA JSONWEBTOKEN: 

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await UserModel.findOne({ email });

        if (!usuario) {
            return res.send("Y este usuario de donde salio?");
        }

        if (!isValidPassword(password, usuario)) {
            return res.send("Credenciales invalidas! Vete ladron malvado!");
        }

        //Si la contraseña es correcta, voy a generar el token: 
        const token = generateToken({
            first_name: usuario.first_name,
            last_name: usuario.last_name,
            email: usuario.email
        })

        res.send({ message: "Login correcto!", token });

    } catch (error) {
        res.status(500).send("Error interno del server");
    }
})


//Rutita para desloguear: 

router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

//Version para GitHub: 

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {

})

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    //La estrategia de Github nos retornará el usuario, entonces lo usamos para colocarlo en el objeto de session: 
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile");
})



export default router;