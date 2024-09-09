import React from 'react';
import { Link } from 'react-router-dom';

function Palvelu() {
    return (
        <div style={{ padding: '20px' }}>
            
            <h2>Palvelusivu</h2>
            <p>Tervetuloa palvelusivulle! Tämä on sivu, jolla on käytettävissä vain kirjautuneille käyttäjille.</p>

            <h3>Käyttäjän tiedot</h3>
            <p>Täällä voit tarkastella ja hallita tietojasi.</p>
            <button>Hallitse profiilia</button>

            <h3>Toiminnot</h3>
            <p>Tarjoamme erilaisia toimintoja kirjautuneille käyttäjille.</p>
            <button>Suorita toiminto</button>
        </div>
    );
}

export default Palvelu;
