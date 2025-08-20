import Joi from 'joi';
import { getRecommendations } from '../integrations/mlGateway.js';

const schema = Joi.object({
  interests: Joi.array().items(Joi.string()).default([]),
  budgetLevel: Joi.number().min(1).max(5).default(3),
  days: Joi.number().min(1).max(30).default(5)
});

export async function getRecs(req, res, next) {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) throw error;
    const result = await getRecommendations(value);
    res.json({ ok: true, ...result });
  } catch (e) { next(e); }
}
