import Joi from 'joi';
import { estimateCost } from '../integrations/mlGateway.js';

const schema = Joi.object({
  itinerary: Joi.array().items(Joi.object({
    destinationId: Joi.string().required(),
    activity: Joi.string().required(),
    day: Joi.number().required()
  })).min(1).required()
});

export async function estimate(req, res, next) {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) throw error;
    const result = await estimateCost(value);
    res.json({ ok: true, ...result });
  } catch (e) { next(e); }
}
