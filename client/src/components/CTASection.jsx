// client/src/components/CTASection.jsx
import { Link } from "react-router-dom";
import "../styles/CTASection.css";

const CTASection = () => {
  return (
    <section className="cta-section">
      <h2>Start Planning Your Journey</h2>
      <p>
        Whether you're dreaming of a beach vacation or an adventure through mountains,
        Zentra’s AI can guide you.
      </p>
      <Link to="/plan" className="cta-button">
        Try AI Planner
      </Link>
    </section>
  );
};

export default CTASection;
