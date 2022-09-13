const express = require('express');
const characterRoutes = require('./characters');
const searchRoutes = require('./search');

const constructorMethod = (app) => {
  app.use('/characters', characterRoutes);
  app.use('/search', searchRoutes);
  app.get('/' , async(req,res)=> {
    res.render('heroes/index',{titlename:"Character Finder"})
  })
  app.use('*', (req, res) => {
    res.status(404).json({ message: `Error: Not a valid URL` });
  });
};

module.exports = constructorMethod;