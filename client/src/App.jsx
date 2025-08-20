import { useState } from 'react';
import { post } from './services/apiClient';

export default function App() {
  const [recs, setRecs] = useState([]);
  const [status, setStatus] = useState('');

  async function getRecs() {
    setStatus('Loading...');
    try {
      const data = await post('/recommendations', { interests: ['beach'], budgetLevel: 3, days: 5 });
      setRecs(data.items || []);
      setStatus('Done');
    } catch (e) {
      setStatus(e.message);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>Intelligent Travel Planner</h1>
      <button onClick={getRecs}>Get Recommendations</button>
      <p>{status}</p>
      <ul>
        {recs.map((r, i) => <li key={i}>{r.name} — score {r.score}</li>)}
      </ul>
    </div>
  );
}
