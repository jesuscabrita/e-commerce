import express from "express";
import { eliminarUserSinConexion, getUserSimple } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUserSimple);
router.delete("/sinconexion", eliminarUserSinConexion);

export default router;