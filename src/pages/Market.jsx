import { useState, useEffect } from "react";
import { db } from "../data/firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/market.css";

function Market() {
  const [markets, setMarkets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("Усі");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "markets"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMarkets(data);
      } catch (error) {
        console.error("Помилка завантаження ринку:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  if (loading) return <div className="market-container"><h2>Завантаження ринку...</h2></div>;

  const sectors = ["Усі", ...new Set(markets.map(m => m.sector))];
  const filteredMarkets = filter === "Усі"
    ? markets
    : markets.filter((m) => m.sector === filter);

  return (
    <main className="market-container">
      <div className="competitors-grid-wrapper">
        <h1>ПЕРЕГЛЯД РИНКУ</h1>

        <div className="filter-container">
          <label htmlFor="sector-filter"><strong>Сфера:</strong></label>
          <select
            id="sector-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {sectors.map((sector, idx) => (
              <option key={idx} value={sector}>{sector}</option>
            ))}
          </select>
        </div>

        <div className="grid-scroll-container">
          <section className="competitors-grid" id="competitors-list">
            {filteredMarkets.map((market, index) => (
              <div key={index} className="competitor-card">
                <img src={process.env.PUBLIC_URL + market.image} alt={market.name} />
                <div className="competitor-info">
                  <p><strong>Компанія:</strong> {market.name}</p>
                  <p><strong>Сфера:</strong> {market.sector}</p>
                  <button className="learn-more-btn" onClick={() => setSelected(market)}>
                    Дізнатись більше
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      {selected && (
        <div id="competitor-modal" className="modal show" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setSelected(null)}>&times;</span>
            <h2>Детальний аналіз:</h2>
            <div className="modal-grid">
              <div className="modal-left">
                <p><strong>Назва:</strong> {selected.name}</p>
                <p><strong>Сфера:</strong> {selected.sector}</p>
                <p><strong>Капітал:</strong> {selected.capital}</p>
                <p><strong>Адреса:</strong> {selected.address}</p>
                <p><strong>Фінансові показники:</strong> {selected.financials}</p>
                <p><strong>Засновано:</strong> {selected.founded}</p>
                <p><strong>CEO:</strong> {selected.ceo}</p>
                <p><strong>Кількість працівників:</strong> {selected.employees}</p>
                <p><strong>Частка ринку:</strong> {selected.marketShare}</p>
                <p><strong>Дохід:</strong> {selected.revenue}</p>
                <p><strong>Витрати:</strong> {selected.expenses}</p>
              </div>
              <div className="modal-right">
                <p><strong>Тренди:</strong> {selected.trends}</p>
                <p><strong>Можливості для розвитку:</strong> {selected.opportunities}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Market;
