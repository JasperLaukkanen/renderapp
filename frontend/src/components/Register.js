import React, { useState } from 'react';
import axios from 'axios'; // Muista asentaa axios: npm install axios

// Register-komponentti käsittelee käyttäjän rekisteröinnin
function Register() {
    // useState hook luo tilan käyttäjän tiedoille: käyttäjänimi, salasana ja bio
    const [user, setUser] = useState({ username: '', password: '', bio: '' });

    // useState hookit onnistumis- ja virheviesteille
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // handleChange-funktio päivittää tilan, kun käyttäjä muuttaa lomakkeen kenttää
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // handleSubmit-funktio käsittelee lomakkeen lähetyksen
    const handleSubmit = async (e) => {
        e.preventDefault();

       
        setError('');
        setSuccess('');

        try {
            // Lähetetään tiedot backendille
            const response = await axios.post('https://renderitestaus.onrender.com/api/users', user);
            setSuccess(response.data);
            setUser({ username: '', password: '', bio: '' });
        } catch (err) {
            setError('Virhe rekisteröinnissä: ' + err.response.data);
        }
    };

    // Lomakkeen renderöinti
    return (
        <div>
            <h2>Rekisteröinti</h2>

            
            {success && <p style={{ color: 'green' }}>{success}</p>}

            
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Käyttäjänimi:
                    <input
                        type="text"
                        name="username"
                        value={user.username}
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
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={user.bio}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Rekisteröidy</button>
            </form>
        </div>
    );
}

export default Register;
