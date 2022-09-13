const express = require('express');
const app = express();
const static = express.static(__dirname+'/public');
const session = require('express-session');
const configRoutes = require('./routes');

const cookieParser = require('cookie-parser');
const path = require('path');
app.use(cookieParser());

app.use('/public',static);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//what is needed for cookie
app.use(session({
    name:"AuthCookie",
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
    }))
app.use('/login', (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/private');
    } else {
      //here I',m just manually setting the req.method to post since it's usually coming from a form
      next();
    }
  });
app.use('/signup', (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/private');
    } else {
      //here I',m just manually setting the req.method to post since it's usually coming from a form
      next();
    }
  });
app.use('/private', (req, res, next) => {
    
    if (!req.session.user) {
      return res.status(404).redirect('/');//Send to a html file.
    } else {
      next();
    }
  });
  app.use(async (req, res, next) => {
    if(!req.session.user)
    {
      console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (Non-Authenticated User)`);
    }
    else
    {
      console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (Authenticated User)`);
    }
    next();
  });

configRoutes(app);

app.listen(3000,() =>
{
    console.log("We've now got a server!"); 
    console.log('Your routes will be running on http://localhost:3000');
}

)