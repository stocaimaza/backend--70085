import mongoose from "mongoose";

mongoose.connect("mongodb+srv://backend70080:coderhouse@cluster0.4fw2i.mongodb.net/Jugueteria?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Todo bien!"))
    .catch((error) => console.log("Todo mal!", error) )




