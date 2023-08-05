import { ChatService } from "../dao/services/chatService.js";
import { ProductsService } from "../dao/services/productService.js";
import { TicketService } from "../dao/services/ticketService.js";
import { UserService } from "../dao/services/userService.js";

const productsService = ProductsService.getInstance();
const chatService = ChatService.getInstance();
const userService = UserService.getInstance();
const ticketService = TicketService.getInstance();

export const getPago = async (req, res) => {
    const cid = req.params.cid;
    const cart = await userService.getUserCartById(cid);
    res.render("pago", { title: "Pago", cart: cart,user: req.session.user });
};

export const getUsuariosAdmin = async (req, res) => {
    const usuarios = await userService.getUser()
    res.render("usuarios", { title: "Usuarios", user: req.session.user, usuarios: usuarios });
};

export const getResetPassword = async (req, res) => {
    const resetToken = req.params.resetToken;
    const isTokenValid = await userService.isValidResetToken(resetToken);
    if (isTokenValid) {
        res.render("Reset", { title: "Reset", resetToken, user: req.session.user });
    } else {
        res.render("reset-error", { message: "El token ha expirado o no es válido." });

}}

export const getSolicitud = async (req, res) => {
    res.render("solicitud", { title: "Solicitud", user: req.session.user });
};

export const getLogin = async (req, res) => {
    res.render("login", { title: "Login", user: req.session.user });
};

export const getRegister = async (req, res) => {
    res.render("register", { title: "Register", user: req.session.user });
};

export const getProfile = async (req, res) => {
    res.render("profile", { user: req.session.user });
};

export const getlogout = async (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};

export const addProduct = async (req, res) => {
    return res.render("addProduct", {
        user: req.session.user,
    });
};

export const getTicketById = async (req, res) => {
    const tid = req.params.tid;
    const ticket = await ticketService.getTicketById(tid);
    if (!ticket) {
        return res.status(400).send({ status: "Error", error: "Ticket no encontrado" });
    } else {
        return res.render("ticket", { title: "Ticket", tickets: ticket, user: req.session.user });
    }
}

export const getProduct = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = req.query.limit;
    const query = req.query;
    const {
        payload: products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
    } = await productsService.getProducts(limit, page, query);
    
    return res.render("products", {
        products: products,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        user: req.session.user,
    });
};

export const getProductById = async (req, res) => {
    try {
        const pid = req.params.pid;
        const producto = await productsService.getProductById(pid);
        return res.render("product", { title: "Product", producto: producto, user: req.session.user });
    } catch (error) {
        return res.status(404).send({ status: "Error", error: "No se encontró el producto seleccionado" });
    }
};

export const getCartById = async (req, res) => {
    const cid = req.params.cid;
    const cart = await userService.getUserCartById(cid);
    if (!cart) {
        return res.status(400).send({ status: "Error", error: "Carrito no encontrado" });
    } else {
        return res.render("cart", { title: "Cart", cart: cart, user: req.session.user });
    }
};

export const getAdmin = async (req, res) => {
    const cart = await userService.getUser()
    if (!cart) {
        return res.status(400).send({ status: "Error", error: "Carrito no encontrado" });
    } else {
        return res.render("admin", { title: "admin", cart: cart, user: req.session.user });
    }
};

export const getRealtimeproducts = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = req.query.limit;
    const query = req.query;
    const productos = await productsService.getProducts(limit, page, query);
    res.render("realtimeproducts", { title: "realtimeproducts", productos: productos, user: req.session.user });
};

export const getHomeProduct = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = req.query.limit;
    const query = req.query;
    const productos = await productsService.getProducts(limit, page, query);
    res.render("home", { title: "home", productos: productos, user: req.session.user });
};

export const getChat = async (req, res) => {
    const messages = await chatService.getMessages();
    res.render("chat", { title: "chat", messages: messages, user: req.session.user });
};