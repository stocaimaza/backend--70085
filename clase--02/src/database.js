import mongoose from "mongoose";

mongoose.connect("mongodb+srv://backend70080:coderhouse@cluster0.4fw2i.mongodb.net/Sessiones?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Todo bien, la vida me sonrie"))
    .catch((error) => console.log("Todo mal, quiero llorar", error))