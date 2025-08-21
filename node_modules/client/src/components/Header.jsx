// Header.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css"; // ← make sure path is correct

const navItems = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Experiences", path: "/experiences" },
  { name: "Tours", path: "/tours" },
  { name: "Deals", path: "/deals" },
  { name: "Plan with AI", path: "/plan/start" },
  { name: "Blog", path: "/blog" },
  { name: "Help", path: "/help" },
  { name: "My Account", path: "/account" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Zentra Travels
        </Link>

        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
