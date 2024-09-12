//Instalamos: npm install passport-jwt
import passport from "passport";
import jwt from "passport-jwt"; 
//Guarda! Cuidado con lo que importan! Tenemos que traer la estrategia de Passport. 

const JWTStategy = jwt.Strategy; 
const ExtractJwt = jwt.ExtractJwt; 

const initializePassport = () => {
    passport.use("jwt", new JWTStategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
        secretOrKey: "coderhouse",
        //Misma palabra que pusimos en la App! 
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error); 
        }
    }))
}

//Creamos el cookie extractor: 

const cookieExtractor = (req) => {
    let token = null; 
    if( req && req.cookies ) {
        token = req.cookies["coderCookieToken"]; 
        //Verifico primero si hay cookie, y si hay tomo la que necesito. 
    }
    return token; 
}

export default initializePassport; 