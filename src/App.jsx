import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Investors from "./pages/Investors";
import Charts from "./pages/Charts";
import Market from "./pages/Market";
import MyProfile from "./pages/MyProfile";
import MyStartups from "./pages/MyStartups";
import CreateStartup from "./pages/CreateStartup";
import EditStartup from "./pages/EditStartup";

import "./styles/header_footer.css";
import "./styles/styles.css";
import "./styles/investors.css";
import "./styles/charts.css";
import "./styles/market.css";
import "./styles/my_profile.css";
import "./styles/my_startups.css";
import "./styles/startup_form.css"; // ✅ замість create/edit

function App() {
  return (
    <Router>
      <div
        className="app-wrapper"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/market" element={<Market />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/my_startups" element={<MyStartups />} />
            <Route path="/create_startup" element={<CreateStartup />} />
            <Route path="/edit_startup" element={<EditStartup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
