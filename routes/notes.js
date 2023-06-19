const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

//get all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//get specific note by id
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

//add new note
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

// Delete
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make array with all notes except the one trying to be deleted
            const result = json.filter((note) => note.id !== noteId);

            // Rewrite note file with the new array
            writeToFile('./db/db.json', result);

            res.json(`Note has been deleted`);
        });
});

module.exports = notes;
