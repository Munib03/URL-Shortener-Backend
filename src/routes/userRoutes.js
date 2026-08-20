import userController from "../controllers/userController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();


router.get("/me", authMiddleware, userController.getMe);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);


export default router;