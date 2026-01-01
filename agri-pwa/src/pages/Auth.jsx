import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import logo from '../assets/logo.png';
import './Auth.css';

// Constantes pour les onglets
const TABS = {
  LOGIN: 'login',
  REGISTER: 'register'
};

// Composant pour l'onglet de navigation
const AuthTab = ({ activeTab, tabName, label, onClick }) => (
  <button
    type="button"
    className={`auth-tab-button ${activeTab === tabName ? 'active' : ''}`}
    onClick={() => onClick(tabName)}
    aria-selected={activeTab === tabName}
    aria-controls={`${tabName}-panel`}
    id={`${tabName}-tab`}
  >
    {label}
  </button>
);

const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(TABS.LOGIN);
  const navigate = useNavigate();

  // Mettre à jour l'onglet actif quand l'URL change
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (Object.values(TABS).includes(tab)) {
      setActiveTab(tab);
    } else {
      // Par défaut, on affiche l'onglet de connexion
      setSearchParams({ tab: TABS.LOGIN }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Mémoriser la fonction de changement d'onglet
  const handleTabChange = useCallback((tab) => {
    if (Object.values(TABS).includes(tab)) {
      setActiveTab(tab);
      setSearchParams({ tab }, { replace: true });
    }
  }, [setSearchParams]);

  // Rendu du contenu en fonction de l'onglet actif
  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.LOGIN:
        return <Login onSuccess={() => navigate('/home')} />;
      case TABS.REGISTER:
        return <Register onSuccess={() => handleTabChange(TABS.LOGIN)} />;
      default:
        return null;
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <header className="auth-header">
          <img 
            src={logo} 
            alt="AgriMarket" 
            className="auth-logo" 
            aria-label="Logo AgriMarket"
          />
        </header>
        
        <div className="auth-tabs-container" role="tablist">
          <div className="auth-tabs">
            <AuthTab 
              activeTab={activeTab}
              tabName={TABS.LOGIN}
              label="Connexion"
              onClick={handleTabChange}
            />
            <AuthTab 
              activeTab={activeTab}
              tabName={TABS.REGISTER}
              label="Inscription"
              onClick={handleTabChange}
            />
          </div>
        </div>

        <main className="auth-content" role="tabpanel">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Auth;