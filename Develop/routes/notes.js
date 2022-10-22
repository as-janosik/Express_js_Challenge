const nt = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route
nt.get('/notes', (req, res) =>
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route
nt.post('/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const {title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const /*newFeedback*/newNote = {
      title,
      text,
    };

    readAndAppend(newNote, '../db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

module.exports = nt;
