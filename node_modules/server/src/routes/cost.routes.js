import { Router } from 'express';
import { estimate } from '../controllers/cost.controller.js';
const r = Router();
r.post('/estimate', estimate);
export default r;
