const signUpRoutes = require('./signup');
const loginRoutes = require('./login');
const privateRoutes = require('./private');
const logOutRoutes = require('./logout');
const path = require('path');
const constructorMethod = (app) => {
  app.use('/private', privateRoutes);
  app.use('/login', loginRoutes);
  app.use('/signup', signUpRoutes);
  app.use('/logout', logOutRoutes);
  app.get('/' , async(req, res)=>{
    //how to check user authentification
    res.sendFile(path.resolve('public/static/loginForm.html'));

  });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;