//Bcrypt es una libreria de hashing de contraseñas.

//1) Instalamos: npm i brcypt
//2) Importamos el modulo: 

import bcrypt from "bcrypt"; 

//Se crearan dos funciones: 
//1) createHash: aplica el hash al password. 
//2) isValidPassword: compara el password propocionado por el usuario con el guardado en la base de datos. 


const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 

//hashSync: toma el password que le pasamos y aplica el proceso de hasheo a partir de un "salt". 

//Un "salt" es un string random que hace que el proceso de haseho se realice de forma impredecible. 

//genSaltSync(10): generar un salt de 10 caracteres. 
//ESTE PROCESO ES IRREVERSIBLE, AHH VAMOS A MORIR!!. 

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password); 

//compareSync = compara los password, retorna true o falsete segun corresponda. 

export {createHash, isValidPassword};
