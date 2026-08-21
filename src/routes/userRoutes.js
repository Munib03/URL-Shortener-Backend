import userController from "../controllers/userController.js";
import express from "express";
import authMiddleware, { ensureUserIsAuthenticated } from "../middlewares/authMiddleware.js";


const router = express.Router();


router.get("/me", authMiddleware, ensureUserIsAuthenticated, userController.getMe);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);


export default router;