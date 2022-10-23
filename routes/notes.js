const nt = require('express').Router();
const unid = require('uniqid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils.js');

//Get /api/notes should read the db.json file
nt.get('/', (req, res) =>{

console.info(`${req.method} request received for pop-notes`);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST /api/notes should receive new note and save via request body to db.json
nt.post('/', (req, res) => {
  console.info(`${req.method} request received for Post-it`);
  // Destructuring assignment for the items in req.body
  const {title, text} = req.body;
  const id = unid();
  // If all the required properties are present
  if (id && title && text) {
    // Variable for the object we will save
    const newNote = {
      id,
      title,
      text
    };

    readAndAppend(newNote, './db/db.json');

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
