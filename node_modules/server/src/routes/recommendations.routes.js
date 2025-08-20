import { Router } from 'express';
import { getRecs } from '../controllers/recommendations.controller.js';
const r = Router();
r.post('/', getRecs);
export default r;
