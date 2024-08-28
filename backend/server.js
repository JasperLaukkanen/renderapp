
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


app.put('/api/users/:id', async (req, res) => { //mieti toimiiko :id tällä rivillä
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Virhe päivittäessä käyttäjää' });
  }
});


app.delete('/api/users/:id', async (req, res) => { //mieti toimiiko :id tällä rivillä
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Käyttäjä poistettu' });
  } catch (error) {
    res.status(500).json({ message: 'virhe käyttäjää poistaessa' });
  }
});

//tähän väliin ehkä lisättävä kirjautumista varten post-toiminto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä portissa ${PORT}`);
});
