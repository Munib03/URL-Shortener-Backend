import express from "express";
import urlController from "../controllers/urlController.js";
import authMiddleware, { ensureUserIsAuthenticated } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/all", authMiddleware, ensureUserIsAuthenticated, urlController.getAllURLs);
router.get("/:shortCode", urlController.getUrlByShortCode);
router.post("/shorten", authMiddleware, ensureUserIsAuthenticated, urlController.registerURL);


export default router;