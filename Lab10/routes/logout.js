const express = require('express');
const router = express.Router();
const data = require('../data');
const userData= data.users;
const path = require('path');
router.get("/", async(req, res) =>{
    req.session.destroy();
    res.sendFile(path.resolve('public/static/logout.html'));

});
module.exports = router;