import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: String, 
    categoria: String, 
    fullname: {
        type: String, 
        required: true
    }, 
    precio: Number
})

const ProductoModel = mongoose.model("juguetes", productoSchema);

export default ProductoModel; 