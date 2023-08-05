import express from "express";
import { addChats, deleteChats, editChats, getChats } from "../controllers/chat.js";
import { authorization } from "../middlewares/authorization.js";

const router = express.Router();

router.get("/", getChats);
router.post("/", authorization("usuario"),addChats);
router.put("/:id", editChats);
router.delete("/:id",authorization("usuario") ,deleteChats);

export default router;