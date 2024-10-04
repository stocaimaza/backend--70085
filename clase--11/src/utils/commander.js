import { Command } from "commander";
const program = new Command(); 

//1 - Comando // 2 - La descripción // 3 - Valor por default
program
    .option("--mode <mode>", "entorno de trabajo", "produccion")
program.parse(); 

export default program; 