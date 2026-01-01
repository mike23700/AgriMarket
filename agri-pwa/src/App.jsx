import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Auth from './pages/Auth';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import logo from './assets/logo.png';

// Composant pour la landing page
const LandingPage = () => {
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
  const { user } = useAuth();

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Navigate to="/home" replace /> : <LandingPage />} 
          />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;