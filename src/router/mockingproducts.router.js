import express from "express";
import { getMockingproducts } from "../controllers/mockingproducts.js";

const router = express.Router();

router.get("/", getMockingproducts);

export default router;