import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Routerin käyttö navigointiin

function Login() {
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
            const response = await axios.post('https://renderitestaus.onrender.com/api/login', credentials);
            navigate('/Palvelu'); 
        
        } catch (err) {
            const message = err.response?.data?.message || 'Yhteys epäonnistui';
            setError('Virhe kirjautumisessa: ' + message);
        }
    };

    return (
        <div>
            <h2>Kirjaudu sisään</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Käyttäjänimi:
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Salasana:
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Kirjaudu</button>
            </form>
        </div>
    );
}

export default Login;
