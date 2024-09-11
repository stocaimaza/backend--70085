//Instalamos: npm i passport passport-local

//Importamos los modulos: 

import passport from "passport";
import local from "passport-local"; 

//Nueva estrategia con GitHub: 
import GitHubStrategy from "passport-github2";

//Nueva estrategia con Google:
import GoogleStrategy from "passport-google-oauth20"; 

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

    //Acá desarrollamos nuestra nueva estrategia con GitHub: 
    passport.use("github", new GitHubStrategy({
        clientID:"Iv23lidbMwcFKk6GXpCk",
        clientSecret: "35c369c9f97919c92627ea390a8e18cacfc6db0f",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done ) => {
        //Sugerencia: 
        console.log("Profile:", profile); 

        try {
            let user = await UserModel.findOne({email: profile._json.email})

            if(!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 37,
                    email: profile._json.email, 
                    password: ""
                }

                let result = await UserModel.create(newUser);
                done(null, result); 
            } else {
                done(null, user); 
            }

        } catch (error) {
            return done(error);
        }

    }))

    //Ahora sumamos la estrategia de Google: 
    passport.use("google", new GoogleStrategy({
        clientID: "444057825914-1gurvdt7gc83ri3o6oi0i4cg4o9b3mji.apps.googleusercontent.com",
        clientSecret: "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", 
        callbackURL: "http://localhost:8080/api/sessions/googlecallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findOne({email: profile._json.email}); 

            if(!user) {
                let newUser = {
                    first_name: profile._json.given_name, 
                    last_name: profile._json.family_name,
                    age: 37,
                    email: profile._json.email,
                    password: ""
                }

                let result = await UserModel.create(newUser);
                done(null, result); 
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }))
}

export default initializePassport; 