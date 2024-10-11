import productDao from "../dao/product.dao.js";

class ProductRepository {
    async createProduct(productData) {
        return await productDao.save(productData); 
    }

    async getProductById(id) {
        return await productDao.findById(id); 
    }

    async getProducts(query) {
        return await productDao.find(query); 
    }

    async updateProduct(id, productData) {
        return await productDao.update(id, productData); 
    }

    async deleteProduct(id) {
        return productDao.delete(id); 
    }
}

export default new ProductRepository(); 