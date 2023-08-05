import { CustomError } from "../../error/CustomError.js";
import { CartErrors } from "../../error/diccionario.error.js";
import { CartRepository } from "../repositories/cartRepository.js";

export class CartService {
    static instance = null;

    static getInstance() {
        if (!CartService.instance) {
            CartService.instance = new CartService();
        }
        return CartService.instance;
    }
    constructor() {
        this.cartRepository = CartRepository.getInstance();
    }

    getUser = async () => {
        const data = await this.cartRepository.modelGetUser();
        const user = data.map((user) => user.toObject());
        return user;
    }

    getCarts = async () => {
        const data = await this.cartRepository.modelGetCart();
        const carts = data.map((cart) => cart.toObject());
        return carts;
    };

    getCartById = async (cid) => {
        const carts = await this.getCarts();
        const cart = carts.find((u) => u._id == cid);
        return cart;
    };

    addCart = async (cart) => {
        const carts = await this.getCarts();
        let cartIndex = carts.findIndex((c) => c._id == cart.id);
        if (cartIndex === -1) {
            cartIndex = carts.length;
            carts.push({
                products: [],
            });
        } else {
            carts[cartIndex].products = cart.products;
        }
        const createdCart = await this.cartRepository.modelCartCreate(cart);
        return createdCart.toObject();
    };

    addProducts = async (productId, carritoId, quantity) => {
        try {
            const carritos = await this.getUser();
            const carrito = carritos.find((e) => e.cart._id.toString() === carritoId);
            if (!carrito) {
                const carritoError = CartErrors(carrito).CARRITO_BY_ID_ERROR;
                const errorCarrito = CustomError.generateCustomError(
                    carritoError.name,
                    carritoError.message,
                    carritoError.cause
                );
                throw new Error(errorCarrito.message);
            }

            const product = await this.cartRepository.modelProductAdd(productId);
            if (!product) {
                const productoError = CartErrors(product).PRODUCTO_BY_ID_ERROR;
                const errorProducto = CustomError.generateCustomError(
                    productoError.name,
                    productoError.message,
                    productoError.cause
                );
                throw new Error(errorProducto.message);
            }

            const existingProduct = carrito.cart.products.find((e) => e.product._id.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                carrito.cart.products.push({
                    quantity: quantity,
                    product: product,
                });
            }

            const updatedCart = await this.cartRepository.modelUserfindByIdAndUpdate(
                carrito._id,
                carrito,
            );

            return updatedCart.toObject();
        } catch (error) {
            throw error;
        }
    };

    eliminarProducto = async (productId, cartId) => {
        try {
            const carts = await this.getUser();
            const cart = carts.find((e) => e.cart._id.toString() === cartId);
            if (!cart) {
                const carritoError = CartErrors(cart).CARRITO_BY_ID_ERROR;
                const errorCarrito = CustomError.generateCustomError(
                    carritoError.name,
                    carritoError.message,
                    carritoError.cause
                );
                throw new Error( errorCarrito.message);
            }
    
            const productIndex = cart.cart.products.findIndex((p) => p._id.toString() === productId);
            console.log('productoId', productIndex);
            if (productIndex === -1) {
                const productoError = CartErrors(productIndex).PRODUCTO_BY_ID_ERROR;
                const errorProducto = CustomError.generateCustomError(
                    productoError.name,
                    productoError.message,
                    productoError.cause
                );
                throw new Error(errorProducto.message);
            }
    
            cart.cart.products.splice(productIndex, 1);
            const updatedCart = await this.cartRepository.modeldeleteProduct(
                cart._id,
                cart.cart,
            );
    
            return updatedCart.toObject();
        } catch (error) {
            throw error;
        }
    };

    editarCart = async (cartID, newProducts) => {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex((c) => c._id == cartID);
        if (cartIndex === -1) {
            const carritoError = CartErrors(cartIndex).CARRITO_BY_ID_ERROR;
                const errorCarrito = CustomError.generateCustomError(
                    carritoError.name,
                    carritoError.message,
                    carritoError.cause
                );
            throw new Error(errorCarrito.message);
        }
        const cart = carts[cartIndex];
        cart.products = newProducts;
        const updatedCart = await this.cartRepository.modelCartfindByIdAndUpdate(
            cart._id,
            newProducts
        );
        return updatedCart.toObject();
    };

    updateProductQuantity = async (productID, cartID, quantity) => {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex((c) => c._id == cartID);
        if (cartIndex === -1) {
            const carritoError = CartErrors(cartIndex).CARRITO_BY_ID_ERROR;
                const errorCarrito = CustomError.generateCustomError(
                    carritoError.name,
                    carritoError.message,
                    carritoError.cause
                );
            throw new Error(errorCarrito.message);
        }
        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex((p) => p._id == productID);
        if (productIndex === -1) {
            const productoError = CartErrors(productIndex).PRODUCTO_BY_ID_ERROR;
                const errorProducto = CustomError.generateCustomError(
                    productoError.name,
                    productoError.message,
                    productoError.cause
                );
            throw new Error(errorProducto.message);
        }
        cart.products[productIndex].quantity = quantity;
        const updatedCart = await this.cartRepository.modelCartQuantity(
            cart._id,
            cart,
        );
        return updatedCart.toObject();
    };
}