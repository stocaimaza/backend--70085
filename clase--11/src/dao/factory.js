import MongoDbJugueteDAO from "./mongoDBJugueteDao.js";
import MemoryJugueteDao from "./memoryJugueteDao.js";
import FileSystemJugueteDAO from "./fileSystemJugueteDao.js";
import config from "../config/config.js"; 

let DAO; 

switch (config.persistence) {
    case "mongo":
        DAO = MongoDbJugueteDAO; 
        break;
    case "memory": 
        DAO = MemoryJugueteDao; 
        break; 
    case "file": 
        DAO = FileSystemJugueteDAO; 
        break; 
    default:
        throw new Error("ingreso no valido"); 
}

export default DAO; 