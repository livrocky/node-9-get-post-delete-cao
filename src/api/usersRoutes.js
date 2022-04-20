const express = require('express');
const { dbClient } = require('../config');

const userRoutes = express.Router();

// ROUTES
// GET /users/ atsiųs visus vartotojus;
userRoutes.get('/users', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    const collection = dbClient.db('Media').collection('users');
    const allUsers = await collection.find().toArray();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error('error in getting all users', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

// POST /users/ įrašys vieną vartotoją;
userRoutes.post('/users', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    // paimti gautus duomenis
    console.log('req.body ===', req.body);
    const newUserObj = req.body;
    // su jais sukurti nauja useri
    const collection = dbClient.db('Media').collection('users');
    const insertRezult = await collection.insertOne(newUserObj);
    res.status(201).json(insertRezult);
  } catch (error) {
    console.error('error in creating a user', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

module.exports = userRoutes;
