import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './formAuth.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await authService.login(credentials);
            if (user && user.username) {
                alert("Connexion réussie ! Bienvenue " + user.username);
                navigate('/');
            }
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="form-container">
            <div className="form-content">
                <h2 className="form-title">Connexion AgriMarket</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Nom d'utilisateur" 
                        onChange={handleChange} 
                        required 
                        className="form-input" 
                    />
                    
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Mot de passe" 
                        onChange={handleChange} 
                        required 
                        className="form-input" 
                    />

                    <button type="submit" className="form-button">Se connecter</button>
                </form>
                
                {error && <div className="form-error">{error}</div>}
                
                <p className="form-footer">
                    Pas encore de compte ?{' '}
                    <span onClick={() => navigate('/auth?tab=register')} className="form-link">
                        S'inscrire
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;