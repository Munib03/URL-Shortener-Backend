import "dotenv/config";
import express from "express";
import userRouter from "../src/routes/userRoutes.js";
import urlRouter from "../src/routes/urlRoutes.js";

const app = express();


app.use(express.json());
app.use("/users", userRouter);
app.use("/", urlRouter);


const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Listening for port ${PORT}!`);
})