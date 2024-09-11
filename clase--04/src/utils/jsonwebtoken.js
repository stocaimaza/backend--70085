import jwt from "jsonwebtoken"; 

const private_key = "palabrasecretaparatoken";

const generateToken = (user) => {
    const token = jwt.sign(user, private_key, {expiresIn: "24h"});
    //Le puedo colocar una fecha de expiracion. 
    return token; 
}

export default generateToken; 