import userController from "../controllers/userController.js";
import express from "express";


const router = express.Router();

router.post("/", userController.registerUser);


export default router;