import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentRouter from "./routers/studentRouter.js";
import alumniRouter from "./routers/alumniRouter.js";
import commonRouter from "./routers/commonRouter.js";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
dotenv.config();


const app = express();
app.use(cookieParser())
const port = 3001; //

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);


app.use(express.json());

app.use(studentRouter, alumniRouter, commonRouter);

const uri = `mongodb+srv://AlumnNex:SIH1633@student.zea0p2u.mongodb.net/?retryWrites=true&w=majority&appName=student`;

mongoose
  .connect(uri, {

  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
