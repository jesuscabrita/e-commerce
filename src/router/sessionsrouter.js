import express from "express";
import { cambioContraseña, editDocumentos, editUsuario, eliminarUser, getUser, loginUser, logoutUser, registerUser, solicitarContraseña } from "../controllers/user.js";
import { uploader } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/solicitar", solicitarContraseña);
router.post("/cambiar", cambioContraseña);
router.put("/premium/:userId",editUsuario );
router.post("/:userId/documents", uploader.array("documents", 10), editDocumentos);
router.delete("/:userId", eliminarUser);

export default router;