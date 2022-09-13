const path = require('path');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const constructorMethod = (app) => {

    app.get('/', function (req, res) {
        res.sendFile(path.resolve('public/static/main.html'));
    });
    app.get('/shows',async (req,res)=>{
      //console.log("tooooooop");
     // console.log(req.requestConfig);
      var  {data } = await axios.get('http://api.tvmaze.com/shows')
      res.json(data)
    })
    app.post('/shows',async (req,res)=>{
     // console.log(req.body);
      var  {data } = await axios.get('http://api.tvmaze.com/search/shows?q='+req.body.search)

      res.json(data)
    })
    app.get('/shows/:id',async (req,res)=>{
      console.log(req.params.id)
      try{
       var {data} = await axios.get("http://api.tvmaze.com/shows/"+req.params.id)
      }
      catch(e){
        console.log("There is a problem");
      }
      res.json(data);
    })
    app.use('*', (req, res) => {
      res.sendStatus(404);
    });
  };
  
  module.exports = constructorMethod;
  