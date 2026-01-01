import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Auth from './pages/Auth';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import logo from './assets/logo.png';

// Constantes pour les routes
const ROUTES = {
  HOME: '/home',
  AUTH: '/auth',
  ROOT: '/'
};

// Composant pour la page d'accueil non connecté
const LandingPage = React.memo(() => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate(ROUTES.AUTH);
  };
  
  return (
    <div className="app-container" role="main">
      <div className="app-content">
        <img 
          src={logo} 
          alt="AgriMarket" 
          className="app-logo"
          aria-hidden="true"
        />
        <h1 className="app-title">AgriMarket</h1>
        <p className="app-subtitle">
          Vente directe & traçabilité agricole
        </p>
        <button 
          className="app-button" 
          onClick={handleGetStarted}
          aria-label="Commencer à utiliser AgriMarket"
        >
          Commencer
        </button>
      </div>
    </div>
  );
});

// Composant principal avec le routeur
const App = () => {
  const { user } = useAuth();

  // Mémoriser le rendu des routes pour éviter les recalculs inutiles
  const routes = useMemo(() => [
    {
      path: ROUTES.ROOT,
      element: user ? <Navigate to={ROUTES.HOME} replace /> : <LandingPage />
    },
    {
      path: ROUTES.AUTH,
      element: user ? <Navigate to={ROUTES.HOME} replace /> : <Auth />
    },
    {
      path: ROUTES.HOME,
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      )
    },
    {
      path: "*",
      element: <Navigate to={ROUTES.ROOT} replace />
    }
  ], [user]);

  return (
    <Router>
      <div className="app">
        <Routes>
          {routes.map((route, index) => (
            <Route 
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;