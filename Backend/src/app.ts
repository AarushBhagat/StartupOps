import express from 'express';
import cors from 'cors';
import startupRoutes from './routes/startupRoutes';

const app = express();

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'] })); // Allow Vite frontend
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});
app.use('/api/startup', startupRoutes);

export default app;
