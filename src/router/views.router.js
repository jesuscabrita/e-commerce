import { Router } from "express";
import { checkLogged, checkLogin } from "../middlewares/auth.js";
import { passportCall } from "../middlewares/passportCall.js";
import { auth, authorization } from "../middlewares/authorization.js";
import { addProduct, getAdmin, getCartById, getChat, getHomeProduct, getLogin, getPago, getProduct, getProductById, getProfile, getRealtimeproducts, getRegister, getResetPassword, getSolicitud, getTicketById, getUsuariosAdmin, getlogout } from "../controllers/views.js";
import { createPago } from "../controllers/ticket.js";

const router = Router();

router.get("/login", checkLogged, getLogin);
router.get("/register", checkLogged, getRegister);
router.get("/profile", checkLogin, getProfile);
router.get('/logout', getlogout);
router.get('/Reset/:resetToken', getResetPassword);
router.get('/reset-error', getResetPassword);
router.get('/Solicitud', getSolicitud)
router.get("/usuarios",checkLogin ,authorization("admin"),getUsuariosAdmin);

router.get("/pago/:cid",checkLogin ,getPago);
router.get("/ticket/:tid",checkLogin ,getTicketById);
router.get("/addProduct",checkLogin,auth("usuario"),addProduct);
router.get("/products", checkLogin, getProduct);
router.get("/product/:pid", checkLogin, getProductById);
router.get("/cart/:cid", checkLogin, getCartById);
router.get("/admin", checkLogin, passportCall("jwt"), authorization("admin") , getAdmin);
router.get("/realtimeproducts", checkLogin, getRealtimeproducts);
router.get("/", checkLogin, getHomeProduct);
router.get("/chat",authorization("usuario"),checkLogin, getChat);

router.post("/charge/:uid", createPago)

export default router;