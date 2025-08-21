// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TestAI from './pages/TestAI'; // ← your old code

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dev/test-ai" element={<TestAI />} />
        {/* Add more routes like /plan, /tours/:slug, etc. */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
