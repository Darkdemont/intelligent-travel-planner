import { Router } from 'express';
const r = Router();
r.get('/', (req, res) => res.json({ ok: true, status: 'healthy' }));
export default r;
