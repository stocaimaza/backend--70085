import { createHash, isValidPassword } from "../utils/util.js";
//Importamos el repository: 
import userRepository from "../repositories/user.repository.js";

class UserService {
    async registerUser(userData) {
        const existeUsuario = await userRepository.getUserByEmail(userData.email);
        console.log("llegara hasta aca el codigo? "); 
        console.log(existeUsuario);

        if (existeUsuario) throw new Error("El usuario ya existe");

        userData.password = createHash(userData.password);
        return await userRepository.createUser(userData);
    }

    async loginUser(email, password) {
        const user = await userRepository.getUserByEmail(email);
        if (!user || !isValidPassword(password, user)) throw new Error("Credenciales incorrectas");
        return user;
    }
}

export default new UserService(); 