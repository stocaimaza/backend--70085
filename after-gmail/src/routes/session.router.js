import { Router } from "express";
const router = Router();
import passport from "passport";

//REGISTRO DE USUARIO: 

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

//LOGIN: 

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


//Version para Google: 

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}) ,(req, res) => {})


router.get("/googlecallback", passport.authenticate("google", {failureRedirect:"/login"}) ,async (req, res) => {
    req.session.user = req.user; 
    req.session.login = true; 
    res.redirect("/profile"); 
})


export default router;