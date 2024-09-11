import { Router } from "express";
const router = Router(); 

//Formulario de Registro. 

router.get("/register", (req, res) => {
    if(req.session.login) {
        return res.redirect("/profile"); 
    }
    res.render("registro");
})

//Formulario de Login. 

router.get("/login", (req, res) => {
    if(req.session.login) {
        return res.redirect("/profile"); 
    }
    res.render("login");
})


//Mi perfil. 

router.get("/profile", (req, res) => {
    if(!req.session.login) {
        return res.redirect("/login"); 
    }
    res.render("perfil", {user: req.session.user});
})

export default router;