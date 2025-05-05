import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../data/firebase"; // ПІДКЛЮЧАЄМО auth!
import {
  sectors,
  orgTypes,
  countrySuggestions,
  citySuggestions,
  getImageBySector
} from "../data/startupData";
import "../styles/startup_form.css";

function StartupForm({ mode }) {
  const [searchParams] = useSearchParams();
  const index = searchParams.get("index");
  const navigate = useNavigate();
  const uid = auth.currentUser?.uid; // НОВЕ: беремо UID поточного користувача

  const [form, setForm] = useState({
    name: "",
    sector: "",
    employees: "",
    capital: "",
    type: "",
    country: "",
    city: "",
    street: "",
    building: ""
  });

  useEffect(() => {
    if (!uid) return; // Якщо UID немає — нічого не робимо

    if (mode === "edit") {
      const startups = JSON.parse(localStorage.getItem(`startups_${uid}`)) || [];
      if (index === null || !startups[index]) {
        alert("Стартап не знайдено");
        navigate("/my_startups");
      } else {
        setForm(startups[index]);
      }
    }
  }, [mode, index, navigate, uid]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.sector) {
      alert("Введіть назву та сектор.");
      return;
    }

    if (!uid) {
      alert("Користувач не авторизований.");
      return;
    }

    const startup = { ...form, image: getImageBySector(form.sector) };
    const startups = JSON.parse(localStorage.getItem(`startups_${uid}`)) || [];

    if (mode === "edit") {
      startups[index] = startup;
    } else {
      startups.push(startup);
    }

    localStorage.setItem(`startups_${uid}`, JSON.stringify(startups));
    navigate("/my_startups");
  };

  if (mode === "edit" && !form.name) return null;

  return (
    <main className="main-container">
      <div className={`form-container ${mode}-form`}>
        <div className="left-section">
          <p className="static-title">
            {mode === "edit" ? "Редагування стартапу" : "Мій стартап"}
          </p>
          <p>
            {mode === "edit"
              ? "Відредагуйте дані вашої компанії."
              : "Створіть компанію, оберіть сферу діяльності та налаштуйте параметри бізнесу."}
          </p>

          <label htmlFor="name">Назва компанії:</label>
          <input type="text" id="name" value={form.name} onChange={handleChange} />

          <label htmlFor="sector">Сфера діяльності:</label>
          <select id="sector" size="5" value={form.sector} onChange={handleChange}>
            {sectors.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="right-section">
          <h2>Додаткові параметри:</h2>

          <label htmlFor="employees">Кількість працівників:</label>
          <input type="number" id="employees" value={form.employees} onChange={handleChange} />

          <label htmlFor="capital">Стартовий капітал (USD):</label>
          <input type="number" id="capital" value={form.capital} onChange={handleChange} />

          <label htmlFor="type">Тип організації:</label>
          <select id="type" value={form.type} onChange={handleChange}>
            <option value="">Оберіть тип</option>
            {orgTypes.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>

          <label>Адреса офісу:</label>
          <div className="address-container">
            <input type="text" id="country" placeholder="Країна" list="country-list" value={form.country} onChange={handleChange} />
            <input type="text" id="city" placeholder="Місто" list="city-list" value={form.city} onChange={handleChange} />
            <input type="text" id="street" placeholder="Вулиця" value={form.street} onChange={handleChange} />
            <input type="number" id="building" placeholder="Номер будинку" value={form.building} onChange={handleChange} />
          </div>

          <div className="button-container">
            <button className="green" onClick={handleSubmit}>
              {mode === "edit" ? "Зберегти зміни" : "Створити стартап"}
            </button>
            {mode === "edit" && (
              <button className="red" onClick={() => navigate("/my_startups")}>Скасувати</button>
            )}
          </div>
        </div>
      </div>

      <datalist id="country-list">
        {countrySuggestions.map((c, i) => <option key={i} value={c} />)}
      </datalist>
      <datalist id="city-list">
        {citySuggestions.map((c, i) => <option key={i} value={c} />)}
      </datalist>
    </main>
  );
}

export default StartupForm;
