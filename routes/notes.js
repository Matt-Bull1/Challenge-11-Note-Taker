const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:id', (req, res) => {
    const notesId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === notesId);
            return result.length > 0
                ? res.json(result)
                : res.json('Note with that ID can not be found');
        });

})

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNotes = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNotes, './db/db.json');
        res.json('Note successfully added ');
    } else {
        res.error('Unable to add note');
    }
})

// bonus if time 
//notes.delete('/:id', (req, res) => {

// })

module.exports = notes;
