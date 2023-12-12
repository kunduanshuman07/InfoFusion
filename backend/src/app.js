import express, { json, urlencoded } from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import quizRoutes from "./routes/quiz.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
const app = express();


connectDB();

app.use(json());
app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PATCH'],
    })
  );
app.use(urlencoded({ extended: true }));
app.use('/auth',authRoutes);
app.use('/quiz', quizRoutes);
app.use('/user', userRoutes);
app.listen(3000, ()=>{
    console.log("Server Running on Port 3000");
});