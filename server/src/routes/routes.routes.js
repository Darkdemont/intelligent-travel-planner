import { Router } from 'express';
import { optimize } from '../controllers/routes.controller.js';
const r = Router();
r.post('/optimize', optimize);
export default r;
