import { Router } from "express";
const router = Router(); 

//Formulario de Registro. 

router.get("/register", (req, res) => {
    res.render("registro");
})

//Formulario de Login. 

router.get("/login", (req, res) => {
    res.render("login");
})


//Mi perfil. 

router.get("/profile", (req, res) => {
    res.render("perfil");
})

export default router;