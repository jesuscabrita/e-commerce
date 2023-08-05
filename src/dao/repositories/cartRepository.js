import { cartsModel } from "../models/carts.js";
import { productsModel } from "../models/products.js";
import { userModel } from "../models/user.js";

export class CartRepository {
    static instance = null;

    static getInstance() {
        if (!CartRepository.instance) {
            CartRepository.instance = new CartRepository();
        }
        return CartRepository.instance;
    }
    constructor() { }

    modelGetCart = () => {
        return cartsModel.find();
    }

    modelGetUser = () => {
        return  userModel.find();
    }

    modelCartCreate = (cart) => {
        return cartsModel.create(cart)
    }

    modelUserfindByIdAndUpdate = (carritoID, carrito) => {
        return userModel.findByIdAndUpdate(carritoID, carrito, { new: true })
    }

    modeldeleteProduct = (carritoID, carrito) => {
        return userModel.findByIdAndUpdate(carritoID, { cart: carrito }, { new: true })
    }

    modelCartfindByIdAndUpdate = (cartId, newProducts) => {
        return cartsModel.findByIdAndUpdate(cartId, { products: newProducts }, { new: true })
    }

    modelCartQuantity = (cartId, cart) => {
        return cartsModel.findByIdAndUpdate(cartId, cart, { new: true })
    }

    modelProductAdd = (productId) => {
        return productsModel.findById(productId)
    }
}
