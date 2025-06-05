// src/index.ts

import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import routers from './routers/auth.routes';
 import Taskrouter from './routers/tasks.router';
  import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
// 3000

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Only allow requests from this frontend URL
  methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
  credentials: true, // Include credentials (cookies, authorization headers, etc.)
}));
// Routes

app.use('/api/auth', routers); 
app.use('/api/auth',routers)
app.use('/api/tasks', Taskrouter)
app.use('/api/auth', routers)
app.put('/api/tasks/:id' , Taskrouter)
app.delete('/api/tasks/:id', Taskrouter)
// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
