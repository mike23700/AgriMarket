import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faComment, 
  faBell, 
  faHome, 
  faClipboardList, 
  faCamera, 
  faShoppingCart, 
  faUser,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import './Home.css';

const Home = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Données fictives pour le rendu visuel (Itération 2)
    const marketPrices = [
        { id: 1, name: 'Rice Seed', family: 'Monstera family', price: '55', unit: 'Kg', rating: '4.8', img: 'https://via.placeholder.com/80' },
        { id: 2, name: 'Mango', family: 'Monstera family', price: '40', unit: 'Kg', rating: '4.8', img: 'https://via.placeholder.com/80' },
    ];

    return (
        <div className="home-mobile-container">
            {/* Header Vert */}
            <header className="home-header">
                <div className="header-top">
                    <div className="user-info">
                        <h1>{user?.username || 'Chinnaya'}</h1>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} className="icon" /> Karur, Tamilnadu</p>
                    </div>
                    <div className="header-icons">
                        <div className="icon-group">
                            <span className="icon"><FontAwesomeIcon icon={faComment} /></span>
                            <span className="icon notification">
                                <FontAwesomeIcon icon={faBell} />
                                <span className="badge">2</span>
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="home-content">
                {/* Boutons d'action rapides */}
                <div className="action-buttons">
                    <button className="btn-primary" onClick={() => navigate('/sell')}>Sell My Product</button>
                    <button className="btn-secondary" onClick={() => navigate('/shop')}>
                        Shop <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                </div>

                {/* Section Market Price */}
                <section className="market-section">
                    <div className="section-header">
                        <h2>Market Price</h2>
                        <button className="view-all">View All</button>
                    </div>
                    {marketPrices.map(item => (
                        <div key={item.id} className="market-card">
                            <img src={item.img} alt={item.name} />
                            <div className="card-info">
                                <h3>{item.name}</h3>
                                <p>{item.family}</p>
                                <span className="rating">
                                    <FontAwesomeIcon icon={faStar} className="star-icon" /> {item.rating}
                                </span>
                            </div>
                            <div className="card-price">
                                Rs {item.price}/{item.unit}
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="bottom-nav">
                <div className="nav-item active">
                    <FontAwesomeIcon icon={faHome} />
                </div>
                <div className="nav-item">
                    <FontAwesomeIcon icon={faClipboardList} />
                </div>
                <div className="nav-floating-btn">
                    <FontAwesomeIcon icon={faCamera} className="plus-icon" />
                </div>
                <div className="nav-item">
                    <FontAwesomeIcon icon={faShoppingCart} />
                </div>
                <div className="nav-item" onClick={logout}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </nav>
        </div>
    );
};

export default Home;