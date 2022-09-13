const express = require('express');
const path = require('path');

const constructorMethod = (app) => {

  app.get('/' , async(req,res)=> {
    res.sendFile(path.resolve('public/static/index.html'));
  })
  app.use('*', (req, res) => {
    res.status(404).json({ message: `Error: Not a valid URL` });
  });
};

module.exports = constructorMethod;