//import express and path
const express = require('express');
const path = require('path');
const fs = require('fs')
const api = require('./routes/index.js');

const notes = require('./db/db.json')

//Port that the server will run on
const PORT = process.env.PORT || 3001;

//Initialize express
const app = express();

//middleware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

//static middleware
app.use(express.static('public'));



// GET route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// GET route for home page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => 
    console.log(`App listening on port http://localhost:${PORT}`)
);