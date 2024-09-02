
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');  


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => console.log('Yhdistetty MongoDB'))
.catch((error) => console.error('MongoDB yhteys epäonnistui:', error));


const userSchema = new mongoose.Schema({
  username: {type: String,required:true, unique:true},
  password: String,
  bio: String,
});

const User = mongoose.model('User', userSchema);


app.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send('Käyttäjä rekisteröityi onnistuneesti.');
  } catch (err) {
    res.status(400).send('Virhe rekisteröinnissä: ' + err.message);
  }
});


// CRUD-toiminnot:

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Virhe käyttäjän hakemisessa' });
  }
});


app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Virhe lisättäessä käyttäjää' });
  }
});

// Käyttäjän päivittäminen
app.put('/api/users/:username', async (req, res) => {
  const { username } = req.params;
  const updatedUser = await User.findOneAndUpdate({ username }, req.body, { new: true });
  res.json(updatedUser);
});

// Käyttäjän poistaminen
app.delete('/api/users/:username', async (req, res) => {
  const { username } = req.params;
  await User.findOneAndDelete({ username });
  res.status(204).send();
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Etsi käyttäjä tietokannasta
  const user = await User.findOne({ username });

  // Tarkista, että käyttäjä löytyy ja salasana on oikein
  if (user && user.password === password) {
      // Voit myös käyttää salasanan hashauksen tarkistusta, jos se on käytössä
      res.status(200).json({ message: 'Kirjautuminen onnistui' });
  } else {
      res.status(401).json({ message: 'Virheellinen käyttäjänimi tai salasana' });
  }
});

// Palvelimen käynnistys
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Palvelin toimii portissa ${PORT}`));

