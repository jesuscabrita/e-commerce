import express from "express";
import { loggerTestEndpoint } from "../controllers/loggerTest.js";

const router = express.Router();

router.get("/", loggerTestEndpoint);

export default router;