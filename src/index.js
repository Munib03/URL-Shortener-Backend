import "dotenv/config";
import express from "express";
import userRouter from "../src/routes/userRoutes.js";

const app = express();


app.use(express.json());
app.use("/users", userRouter);


const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Listening for port ${PORT}!`);
})