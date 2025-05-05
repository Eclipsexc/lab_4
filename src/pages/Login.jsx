import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../data/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../styles/Login.css";

const avatarOptions = [
  "/assets/avatar/avatar_default.jpg",
  "/assets/avatar/avatar1.jpg",
  "/assets/avatar/avatar2.jpg",
  "/assets/avatar/avatar3.jpg",
  "/assets/avatar/avatar4.jpg",
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(avatarOptions[0]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Перевірка валідності email вручну
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|ua)$/;
    if (!emailRegex.test(email)) {
      setError("Некоректний формат пошти. Має бути name@domain.com або name@lpnu.ua.");
      return;
    }

    try {
      if (isRegistering) {
        if (!nickname.trim()) {
          setError("Будь ласка, введіть нікнейм.");
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          nickname: nickname.trim(),
          avatar: avatar,
        });

        setSuccess("Реєстрація пройшла успішно!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess("Вхід пройшов успішно!");
      }

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      console.error("Помилка входу:", err);
    
      if (err.code === "auth/user-not-found") {
        setError("Користувача з такою поштою не знайдено.");
      } else if (err.code === "auth/wrong-password") {
        setError("Невірний пароль.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("Користувач з такою поштою вже існує.");
      } else if (err.code === "auth/invalid-email") {
        setError("Некоректна адреса пошти.");
      } else if (err.code === "auth/weak-password") {
        setError("Пароль має містити щонайменше 6 символів.");
      } else {
        setError(`Невідома помилка: ${err.message || "Спробуйте ще раз."}`);
      }
    }
    
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? "Реєстрація" : "Вхід"}</h2>

      <form onSubmit={handleSubmit} className="login-form">
        {isRegistering && (
          <>
            <input
              type="text"
              placeholder="Нікнейм"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
            <div className="avatar-selection">
              <p>Оберіть аватарку:</p>
              <div className="avatar-options">
                {avatarOptions.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`avatar${index + 1}`}
                    className={`avatar-preview ${avatar === src ? "selected" : ""}`}
                    onClick={() => setAvatar(src)}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      border: avatar === src ? "3px solid #00f" : "2px solid gray",
                      cursor: "pointer",
                      margin: "5px",
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isRegistering ? "Зареєструватися" : "Увійти"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <p>
        {isRegistering ? "Вже маєте акаунт?" : "Не маєте акаунту?"}{" "}
        <button
          type="button"
          className="switch-btn"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError("");
            setSuccess("");
          }}
        >
          {isRegistering ? "Вхід" : "Реєстрація"}
        </button>
      </p>
    </div>
  );
}

export default Login;
