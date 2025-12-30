import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './formAuth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        tel: '',
        password: '',
        role: 'buyer'
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(formData);
            setStatus({
                type: 'success',
                message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.'
            });
            setTimeout(() => navigate('/auth?tab=login'), 2000);
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.message || "Une erreur s'est produite lors de l'inscription"
            });
        }
    };

    return (
        <div className="form-container">
            <div className="form-content">
                <h2 className="form-title">Créer un compte</h2>
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Nom d'utilisateur"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />

                    <input
                        type="tel"
                        name="tel"
                        placeholder="Téléphone"
                        value={formData.tel}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    
                    <div className="role-box">
                        <label className="role-label">Je suis un :</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="role-select"
                        >
                            <option value="buyer">Acheteur</option>
                            <option value="agri">Agriculteur</option>
                        </select>
                    </div>

                    <button type="submit" className="form-button">S'inscrire</button>
                    
                    <p className="form-footer">
                        Déjà inscrit ?{' '}
                        <span onClick={() => navigate('/auth?tab=login')} className="form-link">
                            Se connecter
                        </span>
                    </p>
                </form>

                {status.message && (
                    <div className={`alert-message ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                        {status.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;