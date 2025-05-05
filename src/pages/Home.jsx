import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const sections = [
    {
      title: "Ринок",
      description: "Ринок стартапів постійно змінюється, залучаючи нові технології та інноваційні рішення. Основні гравці впливають на формування трендів та напрямків розвитку галузі.",
      image: "/assets/images/image1.jpg",
      link: "/market",
    },
    {
      title: "Інвестори",
      description: "Залучення інвестицій є ключовим етапом розвитку стартапу. Правильний вибір інвесторів та партнерів допоможе вийти на новий рівень та масштабувати бізнес.",
      image: "/assets/images/image3.jpg",
      link: "/investors",
    },
    {
      title: "Порівняльна аналітика",
      description: "Аналіз ключових показників стартапів: доходів, витрат і кількості працівників. Зручні діаграми та таблиці дозволяють порівнювати компанії та виявляти тренди.",
      image: "/assets/images/image2.jpg",
      link: "/charts",
    },
  ];

  const { title, description, image, link } = sections[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sections.length);
  };

  const handleLearnMore = () => {
    navigate(link);
  };

  return (
    <main>
      <section className="hero">
        <img id="hero-image" src={process.env.PUBLIC_URL + image} alt="Section Image" />
        <div className="hero-content">
          <h2 id="section-title">{title}</h2>
          <p id="section-description">{description}</p>
          <div className="button-container">
            <button id="prev-btn" className="nav-btn" onClick={handlePrev}>←</button>
            <button className="learn-more" onClick={handleLearnMore}>Дізнатись більше...</button>
            <button id="next-btn" className="nav-btn" onClick={handleNext}>→</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
