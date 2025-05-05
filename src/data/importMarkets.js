import { db } from "../data/firebase";
import { collection, addDoc } from "firebase/firestore";
import competitors from "../scripts/market_data"; // Імпортуємо дані напряму

export async function uploadMarkets() {
  try {
    const marketsCollection = collection(db, "markets");

    for (const market of competitors) {
      await addDoc(marketsCollection, market);
    }

    console.log("✅ Дані успішно завантажені в базу!");
  } catch (error) {
    console.error("❌ Помилка під час імпорту даних:", error);
  }
}
