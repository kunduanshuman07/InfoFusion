import express, { json, urlencoded } from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();


connectDB();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/auth',authRoutes);

app.listen(3000, ()=>{
    console.log("Server Running on Port 3000");
});