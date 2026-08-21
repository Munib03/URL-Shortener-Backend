import express from "express";
import urlController from "../controllers/urlController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/shorten", authMiddleware, urlController.registerURL);

export default router;