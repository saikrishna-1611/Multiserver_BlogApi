import express from "express";
import connectDB from "./utils/db.js";
import router from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(express.json());
connectDB();
app.use('/users',router);
app.listen(process.env.PORTU,()=>{
  console.log(`USER sERVICE RUNNING ON PORT ${process.env.PORTU}`);
});