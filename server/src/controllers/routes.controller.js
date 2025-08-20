import Joi from 'joi';
import { optimizeRoute } from '../services/routing.service.js';

const schema = Joi.object({
  stops: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  })).min(2).required()
});

export async function optimize(req, res, next) {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) throw error;
    const result = optimizeRoute(value.stops);
    res.json({ ok: true, ...result });
  } catch (e) { next(e); }
}
