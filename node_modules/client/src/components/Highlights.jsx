// client/src/components/Highlights.jsx
import { Link } from "react-router-dom";
import "../styles/Highlights.css";

const features = [
  {
    title: "Explore Destinations",
    description: "Discover curated places based on your travel style and interests.",
    link: "/destinations",
  },
  {
    title: "Custom Tours",
    description: "Browse or tailor-make your perfect tour from our itineraries.",
    link: "/tours",
  },
  {
    title: "Travel Blog",
    description: "Travel tips, seasonal ideas, guides, and more.",
    link: "/blog",
  },
];

const Highlights = () => {
  return (
    <section className="highlights">
      {features.map((f, i) => (
        <div key={i} className="highlight-card">
          <h2>{f.title}</h2>
          <p>{f.description}</p>
          <Link to={f.link}>Learn more →</Link>
        </div>
      ))}
    </section>
  );
};

export default Highlights;
