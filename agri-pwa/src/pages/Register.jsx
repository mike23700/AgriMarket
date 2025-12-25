import React, { useState } from 'react';
import authService from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        tel: '',
        password: '',
        role: 'buyer'
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: 'Envoi en cours...' });
        
        try {
            const data = await authService.register(formData);
            setStatus({ 
                type: 'success', 
                message: `Inscription réussie ! Bienvenue ${data.username}.` 
            });
            console.log("Utilisateur créé :", data);
        } catch (err) {
            setStatus({ 
                type: 'error', 
                message: typeof err === 'string' ? err : "Échec de l'inscription." 
            });
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Créer un compte AgriMarket</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Nom d'utilisateur" onChange={handleChange} required style={styles.input} />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
                    <input type="text" name="tel" placeholder="Téléphone (ex: 690123456)" onChange={handleChange} required style={styles.input} />
                    <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required style={styles.input} />
                    
                    <label style={styles.label}>Type de profil :</label>
                    <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
                        <option value="buyer">Acheteur / Consommateur</option>
                        <option value="agri">Agriculteur / Producteur</option>
                    </select>

                    <button type="submit" style={styles.button}>S'inscrire</button>
                </form>

                {status.message && (
                    <div style={{
                        ...styles.alert,
                        backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: status.type === 'success' ? '#155724' : '#721c24'
                    }}>
                        {status.message}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f5f5f5' },
    card: { backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
    title: { textAlign: 'center', color: '#2e7d32', marginBottom: '20px' },
    label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' },
    button: { width: '100%', padding: '12px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' },
    alert: { marginTop: '20px', padding: '10px', borderRadius: '5px', textAlign: 'center', fontSize: '14px' }
};

export default Register;