import { useEffect, useState } from "react";
import { db } from "../data/firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/investors.css";

function Investors() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "investors"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInvestors(data);
      } catch (error) {
        console.error("Помилка завантаження інвесторів:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []);

  useEffect(() => {
    document.body.classList.add("investors-page");
    return () => {
      document.body.classList.remove("investors-page");
    };
  }, []);

  if (loading) return <div className="investors-container"><h2>Завантаження інвесторів...</h2></div>;

  return (
    <div className="investors-container">
      <div className="main-content">
        <h1>Список Інвесторів</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Ім'я</th>
                <th>Сфера</th>
                <th>Об’єм портфелю</th>
                <th>Компанії</th>
                <th>Країна</th>
                <th>Досвід</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((inv, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={process.env.PUBLIC_URL + inv.image}
                      alt={inv.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "10px",
                        verticalAlign: "middle",
                      }}
                    />
                    {inv.name}
                  </td>
                  <td>{inv.sector}</td>
                  <td style={{ color: "green", fontWeight: "bold" }}>
                    ${Number(inv.portfolio).toLocaleString()} мільйонів USD
                  </td>
                  <td>{inv.companies}</td>
                  <td>
                    {inv.country}
                    <img
                      src={process.env.PUBLIC_URL + inv.flag}
                      alt={`${inv.country} flag`}
                      style={{
                        width: "25px",
                        height: "auto",
                        marginLeft: "5px",
                        verticalAlign: "middle",
                      }}
                    />
                  </td>
                  <td>{inv.experience} років</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Investors;
