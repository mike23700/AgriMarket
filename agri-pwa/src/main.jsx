import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import App from './App.jsx';

// Fonction pour mettre à jour l'application
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Une nouvelle version est disponible. Recharger pour mettre à jour ?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('Application prête à fonctionner hors ligne');
  },
});

// Fonction pour vérifier les mises à jour au démarrage
const checkForUpdates = async () => {
  try {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      if (registration) {
        registration.update();
      }
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des mises à jour :', error);
  }
};

// Composant racine avec gestion des mises à jour
const Root = () => {
  useEffect(() => {
    // Vérifier les mises à jour au chargement de l'application
    checkForUpdates();
    
    // Vérifier les mises à jour toutes les heures
    const interval = setInterval(checkForUpdates, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  );
};

// Rendu de l'application
createRoot(document.getElementById('root')).render(<Root />);

