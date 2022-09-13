const express = require('express');
const router = express.Router();
const data = require('../data');
const userData= data.users;
const path = require('path');
module.exports = router;
router.get("/", async(req, res) =>{
    res.sendFile(path.resolve('public/static/private.html'));

});