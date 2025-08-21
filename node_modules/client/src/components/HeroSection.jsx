// client/src/components/HeroSection.jsx
import { Link } from "react-router-dom";
import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1>Welcome to Zentra Travels</h1>
      <p>
        Discover personalized adventures powered by AI. Start planning your perfect trip today.
      </p>
      <Link to="/plan/start" className="hero-button">
        Plan with AI
      </Link>
    </section>
  );
};

export default HeroSection;
