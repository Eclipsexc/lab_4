import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../data/firebase"; // ПІДКЛЮЧАЄМО auth
import "../styles/my_startups.css";

function MyStartups() {
  const [startups, setStartups] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // НОВЕ
  const navigate = useNavigate();

  useEffect(() => {
    const loadStartups = () => {
      const user = auth.currentUser;
      if (user) {
        const userStartups = JSON.parse(localStorage.getItem(`startups_${user.uid}`)) || [];
        setStartups(userStartups);
      }
      setIsLoading(false);
    };

    loadStartups();
  }, []);

  const closeModal = () => setSelected(null);

  const renderModal = () => {
    if (!selected) return null;

    const address = `${selected.country || "-"}, ${selected.city || "-"}, ${selected.street || "-"}, ${selected.building || "-"}`;

    return (
      <div className="modal" style={{ display: "flex" }} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={closeModal}>×</span>
          <h2>Детальний опис:</h2>
          <div className="modal-grid">
            <div className="modal-left">
              <p><strong>Назва:</strong> {selected.name || "-"}</p>
              <p><strong>Сфера:</strong> {selected.sector || "-"}</p>
              <p><strong>Капітал:</strong> ${selected.capital || "-"}</p>
              <p><strong>Тип організації:</strong> {selected.type || "-"}</p>
              <p><strong>Адреса:</strong> {address}</p>
            </div>
            <div className="modal-right">
              <p><strong>Кількість працівників:</strong> {selected.employees || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div>Завантаження стартапів...</div>;
  }

  return (
    <div className="market-container">
      <div className="competitors-grid-wrapper">
        <h1 className="non-clickable">Мої стартапи</h1>
        <div className="competitors-grid">
          {startups.length === 0 ? (
            <div className="competitor-card empty-info">
              <p style={{ fontWeight: "bold", fontSize: "17px" }}>Поки не створено жодного стартапу,</p>
              <p style={{ color: "#444" }}>втім ви можете це виправити →</p>
            </div>
          ) : (
            startups.map((startup, index) => (
              <div className="competitor-card" key={index}>
                <img src={startup.image} alt={startup.name} />
                <div className="competitor-info">
                  <p><strong>Компанія:</strong> {startup.name}</p>
                  <p><strong>Сфера:</strong> {startup.sector}</p>
                </div>
                <div className="card-buttons">
                  <button className="learn-more-btn" onClick={() => setSelected(startup)}>
                    Дізнатись більше
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit_startup?index=${index}`)}
                    title="Редагувати"
                  >
                    <img src="/assets/icons/edit.png" alt="edit" />
                  </button>
                </div>
              </div>
            ))
          )}
          <a href="/create_startup" className="competitor-card add-card">
            <span>+</span>
          </a>
        </div>
      </div>

      {renderModal()}
    </div>
  );
}

export default MyStartups;
