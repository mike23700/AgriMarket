import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const user = await authService.login(credentials);
        // utilisateur trouvé !
        alert("Connexion réussie ! Bienvenue " + user.username);
        navigate('/'); 
    } catch (err) {
        // Utilisateur non trouvé
        setError(err); 
    }
};

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Connexion AgriMarket</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Nom d'utilisateur" 
                           onChange={handleChange} required style={styles.input} />
                    
                    <input type="password" name="password" placeholder="Mot de passe" 
                           onChange={handleChange} required style={styles.input} />

                    <button type="submit" style={styles.button}>Se connecter</button>
                </form>
                
                {error && <p style={styles.error}>{error}</p>}
                
                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    Pas encore de compte ? <a href="/register" style={{color: '#2e7d32'}}>S'inscrire</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' },
    card: { backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '350px' },
    title: { textAlign: 'center', color: '#2e7d32', marginBottom: '20px' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' },
    button: { width: '100%', padding: '12px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
    error: { color: 'red', textAlign: 'center', marginTop: '10px', fontSize: '14px' }
};

export default Login;