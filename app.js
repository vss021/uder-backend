import dotenv from "dotenv";
dotenv.configDotenv();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import connectToDB from "./db/db.js";
import userRouter from './routes/user.routes.js';



const port = process.env.PORT || 3000
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

connectToDB();


app.get("/", (req, res) => {
    res.send(`Server is Running in : ${port}`);
});
app.use("/user", userRouter);

export default app;
