//Procesamiento de argumentos con Commander: 
//https://www.npmjs.com/package/commander
//Instalacion: npm i commander

import { Command } from "commander";
const program = new Command(); 

//1 - Comando // 2 - La descripcion // 3 - Valor por default 

program
    .option("-p <port>", "puerto en el que se inicia el servidor", 8080)
    .option("--mode <mode>", "modo de trabajo", "desarrollo")
program.parse(); 

//Podemos chequear que esto esta tomando los argumentos?
// console.log("Opciones: ", program.opts()); 

export default program; 