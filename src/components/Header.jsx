import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header_footer.css";

function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    const startupButtons = document.querySelectorAll(".contact-btn");
    startupButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        navigate("/profile");
      });
    });
  }, [navigate]);

  return (
    <header style={{ position: "relative", zIndex: 10 }}>
      <h1>
        <a id="home-link" href="/">Симулятор управління стартапом</a>
      </h1>
      <nav>
        <ul className="nav-links">
          <li><a href="#">Про нас</a></li>
          <li><a href="#">Контакти</a></li>
          <li><button className="contact-btn">Мій стартап</button></li>
        </ul>
        <div id="burger-menu" className="burger-menu"></div>
      </nav>
    </header>
  );
}

export default Header;
