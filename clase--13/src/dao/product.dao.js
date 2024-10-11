import ProductModel from "./models/product.model.js";

class ProductDao {
    async findById(id) {
        return await ProductModel.findById(id);
    }

    async find(query) {
        return await ProductModel.find(query); 
    }

    async save(productData) {
        const product = new ProductModel(productData); 
        return await product.save(); 
    }

    async update(id, productData) {
        return await ProductModel.findByIdAndUpdate(id, productData); 
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id); 
    }

}

export default new ProductDao(); 


