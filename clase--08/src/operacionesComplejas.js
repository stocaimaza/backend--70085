
// function operacionCompleja() {
//     let result = 0; 

//     for( let i = 0; i < 5e9; i++ ){
//         result += i; 
//     }
//     return result;
// }

//Lo voy a configurar para que se ejecute solo cuando el padre lo pida: 

process.on("message", (message) => {
    let result = 0;

    for (let i = 0; i < 5e9; i++) {
        result += i;
    }
    process.send(result);
})