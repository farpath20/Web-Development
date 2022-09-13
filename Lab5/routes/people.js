const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;
router.get('/:id', async (req, res) => {
    try {
      if(typeof req.params.id != "string")
      {
        throw "Error: Was not given a string somehow."
      }
      const person = await peopleData.getPersonById(req.params.id);
      res.json(person);
    } catch (e) {
      res.status(404).json({ message: `Person not found` });
    }
  });
router.get('/', async (req, res) => {
    try {
        const personList = await peopleData.getPeople();
        res.json(personList);
    } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;