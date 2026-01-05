import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser as faUserIcon, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-avatar">
          <FontAwesomeIcon icon={faUserIcon} size="3x" />
        </div>
        <h1 className="profile-name">{user?.username}</h1>
        <p className="profile-email">
          <FontAwesomeIcon icon={faEnvelope} className="profile-icon" />
          {user?.email}
        </p>
        <p className="profile-tel">
          <FontAwesomeIcon icon={faPhone} className="profile-icon" />
          {user?.tel}
        </p>
        <p className="profile-location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="profile-icon" />
          Yaoundé, Cameroun
        </p>
      </header>

      <div className="profile-actions">
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default Profile;
