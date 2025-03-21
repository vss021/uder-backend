import dotenv from "dotenv";
dotenv.configDotenv();
import cors from "cors";
import express from "express";


const port = process.env.PORT || 3000
const app = express();
app.use(cors());


app.get("/", (req, res) => {
    res.send(`Server is Running in : ${port}`);
});

export default app;
