import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Auth from './pages/Auth';
import './App.css';
import logo from './assets/logo.png';

// Composant pour la page d'accueil
const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="app-container">
      <div className="app-content">
        <img 
          src={logo} 
          alt="AgriMarket" 
          className="app-logo"
        />
        <h1 className="app-title">AgriMarket</h1>
        <p className="app-subtitle">
          Vente directe & traçabilité agricole
        </p>
        <button 
          className="app-button" 
          onClick={() => navigate("/auth")}
        >
          Commencer
        </button>
      </div>
    </div>
  );
};

// Composant principal avec le routeur
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;