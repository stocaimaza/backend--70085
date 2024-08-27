import mongoose from "mongoose";

mongoose.connect("mongodb+srv://swtocaimaza:coderhouse@cluster0.pmzgicx.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectados a la BD, ya trabajamos para España"))
    .catch((error) => console.log("Me quede dormido, no me pude conectar a las 4 am"))

