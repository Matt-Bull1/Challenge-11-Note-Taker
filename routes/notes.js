const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:id', (req, res) => {

})

notes.post('/', (req, res) => {

})

// bonus if time 
//notes.delete('/:id', (req, res) => {

// })

module.exports = tips;
