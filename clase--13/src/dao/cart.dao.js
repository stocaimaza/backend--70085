import CartModel from "./models/cart.model.js"; 

class CartDao {
    async findById(id){
        return await CartModel.findById(id).populate('products.product', '_id title price'); 
    }

    async save(cartData){
        const cart = new CartModel(cartData);
        return await cart.save();
    }

    async update(id, cartData){
        return await CartModel.findByIdAndUpdate(id, cartData); 
    }

    async delete(id) {
        return await CartModel.findByIdAndDelete(id); 
    }
}

export default new CartDao(); 