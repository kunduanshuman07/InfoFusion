import express, { json, urlencoded } from 'express';
import http from 'http';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import fcRoutes from "./routes/fcp.js";
import debateRoutes from "./routes/debate.js";
import cors from 'cors';
import { initializeSocket } from './socket.js'; 

const app = express();
const server = http.createServer(app);
app.use(express.static('public'));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);

const io = initializeSocket(server);

connectDB();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/fcp', fcRoutes);
app.use('/debate', debateRoutes);
server.listen(3000, () => {
  console.log('Server Running on Port 3000');
});
