import cartRepository from "../repositories/cart.repository.js";

class CartService {
    async createCart(){
        return await cartRepository.createCart(); 
    }

    async getCartById(id){
        return await cartRepository.getCartById(id); 
    }

    async updateCart(id, cartData) {
        return await cartRepository.updateCart(id, cartData); 
    }

    async deleteCart(id) {
        return await cartRepository.deleteCart(id); 
    }
}

export default new CartService(); 