import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

// Composant temporaire pour la page d'accueil
const Home = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Bienvenue sur AgriMarket</h1>
    <p>La plateforme de vente directe du producteur au consommateur.</p>
    <Link to="/register">
      <button style={styles.button}>Commencer - Créer un compte</button>
    </Link>
  </div>
);

function App() {
  return (
    <Router>
      <nav style={styles.nav}>
        <div style={styles.logo}>AgriMarket</div>
        <div>
          <Link path="/" style={styles.link}>Accueil</Link>
          <Link to="/register" style={styles.link}>Inscription</Link>
          <Link to="/login" style={styles.link}>Connexion</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#2e7d32',
    color: 'white',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  link: {
    color: 'white',
    marginLeft: '20px',
    textDecoration: 'none',
    fontWeight: '500'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2e7d32',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

export default App;