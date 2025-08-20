import axios from 'axios';
import ort from 'onnxruntime-node';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let recSession = null;
let costSession = null;

async function loadOnnx() {
  if (!recSession) {
    recSession = await ort.InferenceSession.create(
      path.join(__dirname, '../../..', 'ml', 'artifacts', 'rec_model.onnx')
    );
  }
  if (!costSession) {
    costSession = await ort.InferenceSession.create(
      path.join(__dirname, '../../..', 'ml', 'artifacts', 'cost_model.onnx')
    );
  }
}

export async function getRecommendations(features) {
  if (process.env.ML_MODE === 'python') {
    const url = `${process.env.ML_SERVICE_URL}/recommend`;
    const { data } = await axios.post(url, { features });
    return data; // {items:[...]}
  } else {
    await loadOnnx();
    // TODO: turn features -> Tensor, run recSession.run, parse output
    // For now return stub:
    return { items: [{ name: 'Sample Beach', score: 0.9 }] };
  }
}

export async function estimateCost(features) {
  if (process.env.ML_MODE === 'python') {
    const url = `${process.env.ML_SERVICE_URL}/cost`;
    const { data } = await axios.post(url, { features });
    return data; // { total: number, suggestions: [...] }
  } else {
    await loadOnnx();
    // TODO: features -> Tensor, run costSession.run
    return { total: 250.0, suggestions: ['Try weekday travel to save'] };
  }
}
