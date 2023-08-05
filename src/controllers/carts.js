import { CartService } from "../dao/services/cartService.js";
import { UserService } from "../dao/services/userService.js";

const cartsService = CartService.getInstance();
const userService = UserService.getInstance();

export const getCarts = async (req, res) => {
    const cart = await cartsService.getCarts();
    if (!cart) {
        return res.status(400).send({ status: "Error", error: "Carrito no encontrado" });
    } else {
        return res.status(200).send({ status: "Succes", message: "OK", cart });
    }
};

export const getUserById = async (req, res) => {
    const uid = req.params.uid;
    const cart = await userService.getUserById(uid);
    if (!cart) {
        return res.status(400).send({ status: "Error", error: "Carrito no encontrado" });
    } else {
        return res.status(200).send({ status: "Succes", message: "OK", cart });
    }
};

export const getCartById = async (req, res) => {
    const cid = req.params.cid;
    const cart = await cartsService.getCartById(cid);
    if (!cart) {
        return res.status(400).send({ status: "Error", error: "Carrito no encontrado" });
    } else {
        return res.status(200).send({ status: "Succes", message: "OK", cart });
    }
};

export const addCarts = async (req, res) => {
    try {
        const cartId = parseInt(req.params.id);
        const cart = req.body;
        cart.id = cartId;
        const updatedCart = await cartsService.addCart(cart);
        return res.status(201).send({ status: 'Succes', message: 'Se creo el carritoo correctamente', updatedCart });
    } catch (error) {
        return res.status(400).send({ status:'error', error: error.message});
    }
};

export const addProducts = async (req, res) => {
    try {
        const product = req.body;
        const productID = req.params.pid;
        const carritoID = req.params.cid;
        const cart = await cartsService.addProducts(productID, carritoID, product.quantity || 1);
        return res.status(201).send({ status: 'Success', message: 'Se creo el producto correctamente', result: cart });
    } catch (error) {
        return res.status(400).send({ status:'error', error: error.message});
    }
};

export const productDelete = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartsService.eliminarProducto(productId,cartId)
        return res.status(200).send({ status: 'Success', message: 'Se elimino el producto correctamente', result: cart });
    } catch (error) {
        return res.status(400).send({ status:'error', error: error.message});
    }
};

export const editProduct = async (req, res) => {
    try {
        const newProducts = req.body;
        const carritoID = req.params.cid;
        const cart = await cartsService.editarCart(carritoID, newProducts);
        return res.status(200).send({ status: 'Success', message: 'Se actualizaron los productos correctamente', result: cart });
    } catch (error) {
        return res.status(400).send({ status:'error', error: error.message });
    }
};

export const editQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const productID = pid;
        const updatedCart = await cartsService.updateProductQuantity(productID, cid, quantity);
        return res.status(200).send({ status: 'Success', message: 'Se actualizó la cantidad de unidades del producto correctamente', result: updatedCart });
    } catch (error) {
        return res.status(400).send({ status:'error', error: error.message });
    }
};