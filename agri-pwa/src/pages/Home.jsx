import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CameraPreview from '../components/CameraPreview';
import { 
  faMapMarkerAlt, 
  faComment, 
  faBell, 
  faHome, 
  faClipboardList, 
  faCamera,
  faShoppingCart, 
  faUser,
  faStar as fasStar
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Home.css';
import bananaImg from '../assets/banana.webp';
import mangoImg from '../assets/mango.webp';

// Données statiques
const MARKET_PRICES = [
  { 
    id: 1, 
    name: 'Banana', 
    family: 'Monstera family', 
    price: '55', 
    unit: 'Kg', 
    rating: '4.8', 
    img: bananaImg 
  },
  { 
    id: 2, 
    name: 'Mango', 
    family: 'Monstera family', 
    price: '40', 
    unit: 'Kg', 
    rating: '4.8', 
    img: mangoImg
  },
];

const NAV_ITEMS = [
  { id: 1, icon: faHome, label: 'Home' },
  { id: 2, icon: faClipboardList, label: 'Orders' },
  { id: 3, icon: faCamera, label: 'Add' },
  { id: 4, icon: faShoppingCart, label: 'Cart' },
  { id: 5, icon: faUser, label: 'Profile' },
];

// Composant pour afficher la carte de prix
const PriceCard = ({ item }) => (
  <div className="market-card">
    <img src={item.img} alt={item.name} className="market-image" />
    <div className="market-info">
      <h3>{item.name}</h3>
      <p>{item.family}</p>
      <div className="price-rating">
        <span className="price">${item.price}<small>/{item.unit}</small></span>
        <div className="rating">
          <FontAwesomeIcon icon={fasStar} className="star-icon" />
          <span>{item.rating}</span>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCamera, setShowCamera] = useState(false);

  const handleNavClick = (label) => {
    // Gestion des clics sur les éléments de navigation
    switch(label) {
      case 'Profile':
        navigate('/profile');
        break;
      case 'Home':
        navigate('/home');
        break;
      case 'Add':
        setShowCamera(true);
        break;
      default:
        console.log(`Naviguer vers: ${label}`);
    }
  };

  const handleCapture = (imageUrl) => {
    console.log('Image capturée:', imageUrl);
    setShowCamera(false);
    // traitemnet de l'image que je vais faire ici
    // Par exemple, l'afficher dans un formulaire ou l'envoyer à un serveur
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  return (
    <div className="home-mobile-container">
      <header className="home-header">
        <div className="header-top">
          <div className="user-info">
            <h1>{user?.username}</h1>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" /> 
              Yaoundé, Cameroon 
            </p>
          </div>
          <div className="header-icons">
            <div className="icon-group">
              <button className="icon-btn" onClick={() => console.log('Messages')}>
                <FontAwesomeIcon icon={faComment} />
              </button>
              <button className="icon-btn notification" onClick={() => console.log('Notifications')}>
                <FontAwesomeIcon icon={faBell} />
                <span className="badge">2</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="home-content">
        <div className="action-buttons">
          <button 
            className="btn-primary" 
            onClick={() => navigate('/sell')}
            aria-label="Vendre mon produit"
          >
            Sell My Product
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => navigate('/shop')}
            aria-label="Boutique"
          >
            Shop <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>

        <section className="market-section">
          <div className="market-section-header">
            <h2>Market Price</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="market-grid">
            {MARKET_PRICES.map(item => (
              <PriceCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      <div className="nav-container">
        <nav className="bottom-nav">
          {NAV_ITEMS.map((item, index) => {
            if (index === 2) {
              return <div key="spacer" style={{ width: '60px' }}></div>;
            }
            
            return (
              <div 
                key={item.id} 
                className="nav-icon"
                onClick={() => handleNavClick(item.label)}
              >
                <FontAwesomeIcon icon={item.icon} />
              </div>
            );
          })}
          <div 
            className="nav-floating-btn" 
            onClick={() => handleNavClick('Add')}
            style={{ zIndex: showCamera ? 1001 : 'auto' }}
          >
            <FontAwesomeIcon icon={faCamera} />
          </div>
        </nav>
      </div>
      
      {showCamera && (
        <CameraPreview 
          onClose={handleCloseCamera}
          onCapture={handleCapture}
        />
      )}
    </div>
  );
};

export default Home;