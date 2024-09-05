//Instalamos: npm i passport passport-local

//Importamos los modulos: 

import passport from "passport";
import local from "passport-local"; 

//Me traigo el UserModel y las funciones de bcrypt. 
import UserModel from "../model/usuario.model.js";
import { createHash, isValidPassword } from "../utils/util.js";

const LocalStrategy = local.Strategy; 

const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true, 
        //Le decimos al sistema que queremos acceder al objeto request. 
        usernameField: "email"
        //Como no tenemos campo usuario, vamos a usar el email. 
    }, async (req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body; 

        try {
            //Primero verificamos si ya existe un usuario registrado con ese email: 
            let user = await UserModel.findOne({email: email}); 
            if(user) return done(null, false); 

            //Si no existe, voy a crear un registro nuevo: 

            let nuevoUser = {
                first_name, 
                last_name, 
                email,
                age, 
                password: createHash(password)
            }

            let result = await UserModel.create(nuevoUser); 
            //Si todo resulta bien, podemos mandar el done con el usuario generado: 
            return done(null, result); 
        } catch (error) {
            return done(error); 
        }
    }))

    //Agregamos la estrategia "login": 
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            //Verificamos primero que existe un usuario con ese email: 
            const user = await UserModel.findOne({email}); 
            if(!user) {
                return done(null, false);
            }
            //Si existe el usuario, verifico la contraseña: 
            if(!isValidPassword(password, user)) return done(null, false); 

            return done(null, user); 
        } catch (error) {
            
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id); 
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({_id:id});
        done(null, user);
    })
}

export default initializePassport; 