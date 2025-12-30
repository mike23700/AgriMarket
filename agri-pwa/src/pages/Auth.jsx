import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import logo from '../assets/logo.png';
import './Auth.css';

const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  // Mettre à jour l'onglet actif quand l'URL change
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'register' || tab === 'login') {
      setActiveTab(tab);
    } else {
      // Par défaut, on affiche l'onglet de connexion
      setSearchParams({ tab: 'login' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Changer d'onglet
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab }, { replace: true });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <img src={logo} alt="AgriMarket" className="auth-logo" />
        </div>
        
        <div className="auth-tabs-container">
          <div className="auth-tabs">
            <button
              className={`auth-tab-button ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              Connexion
            </button>
            <button
              className={`auth-tab-button ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => handleTabChange('register')}
            >
              Inscription
            </button>
          </div>
        </div>

        <div className="auth-tab-content">
          {activeTab === 'login' ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Auth;