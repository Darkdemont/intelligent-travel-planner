import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import healthRouter from './routes/health.routes.js';
import recRouter from './routes/recommendations.routes.js';
import costRouter from './routes/cost.routes.js';
import routeRouter from './routes/routes.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/health', healthRouter);
app.use('/api/recommendations', recRouter);
app.use('/api/cost', costRouter);
app.use('/api/routes', routeRouter);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on :${PORT}`));
});
