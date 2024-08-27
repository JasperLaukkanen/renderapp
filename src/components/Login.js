import React, { useState } from 'react';

// Login-komponentti käsittelee käyttäjän kirjautumisen
function Login() {
    // useState hook luo tilan käyttäjän kirjautumistiedoille: käyttäjänimi ja salasana
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    // handleChange-funktio päivittää tilan, kun käyttäjä muuttaa lomakkeen kenttää
    const handleChange = (e) => {
        // Päivitetään vastaava kenttä tilassa
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    // handleSubmit-funktio käsittelee lomakkeen lähetyksen
    const handleSubmit = (e) => {
        e.preventDefault();
        // Tulostetaan kirjautuneen käyttäjän tiedot konsoliin
        console.log('Käyttäjä kirjautunut sisään:', credentials);
        // Näytetään ilmoitus onnistuneesta kirjautumisesta
        alert('Kirjautuminen onnistui');
    };

    // Lomakkeen renderöinti
    return (
        <div>
            <h2>Kirjaudu sisään</h2>
            {}
            <form onSubmit={handleSubmit}>
                <label>
                    Käyttäjänimi:
                    {}
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Salasana:
                    {}
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                {}
                <button type="submit">Kirjaudu</button>
            </form>
        </div>
    );
}

export default Login;

