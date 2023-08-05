import express from "express";
import { addProducts, deleteProducts, editProducts, getProducts, getProductsById } from "../controllers/products.js";
import { uploader } from "../middlewares/multer.js";
import { authorization } from "../middlewares/authorization.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:pid", getProductsById);
router.post("/",uploader.array("thumbnail", 10), addProducts);
router.put("/:id", uploader.array("thumbnail", 10), editProducts);
router.delete("/:id" ,deleteProducts);

export default router;