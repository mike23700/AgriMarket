import api from "./api"; 

const register = async (userData) => {
    try {
        const response = await api.post("/api/auth/register", userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Erreur de connexion au serveur";
    }
};

const login = async (credentials) => {
    try {
        const response = await api.post("/api/auth/login", credentials);
        return response.data; // renvoie les données de l'utilisateur
    } catch (error) {
        //message d'erreur envoyé par Backend 
        const message = error.response ? error.response.data : "Erreur serveur";
        throw message; 
    }
};

export default { register, login };