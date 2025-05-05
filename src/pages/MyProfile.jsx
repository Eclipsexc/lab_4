import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../data/firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../styles/my_profile.css";

function MyProfile() {
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("/assets/icons/Default_user.jpg"); // НОВЕ
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setNickname(data.nickname || "");
            setAvatar(data.avatar || "/assets/icons/Default_user.jpg");
          } else {
            setNickname("");
            setAvatar("/assets/icons/Default_user.jpg");
          }
        } catch (error) {
          console.error("Помилка завантаження профілю:", error);
          setNickname("");
          setAvatar("/assets/icons/Default_user.jpg");
        } finally {
          setIsLoading(false);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Помилка при виході:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-profile">
        Завантаження профілю...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="main-container">
      <div className="profile-box">
        <img
          src={avatar}
          alt="Фото користувача"
          className="profile-photo"
        />
        <h2>
          Добрий день, <strong>{nickname || "Користувачу"}</strong>!
        </h2>

        <div className="profile-buttons">
          <button
            className="startup-link"
            onClick={() => navigate("/my_startups")}
          >
            ● Переглянути мої стартапи
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Вийти з акаунту
          </button>
        </div>
      </div>
    </main>
  );
}

export default MyProfile;
