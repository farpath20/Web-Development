const express = require('express');
const router = express.Router();
const data = require('../data');
const userData= data.users;
const path = require('path');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/", async(req,res)=>{
let username  = req.body.username;
let password = req.body.password;
if(typeof username  != "string")
    {
        //throw "Error: Username was not given as an input.";
        res.sendFile(path.resolve('public/static/error.html'));
    }
    username = username.trim();
    if(username.length<4)
    {
        //throw "Error: Username was not given a specific length.";
        res.sendFile(path.resolve('public/static/error.html'));
    }
    let ogPassword = username;
    username = username.toLowerCase();
    for(i=0; i<username.length;i++)
    {
        let p = username.charCodeAt(i);
        if(!(p>96&&p<123)&&!(p>47&&p<58))
        {
            //throw "Error: Username was given a bad character."
            res.sendFile(path.resolve('public/static/error.html'));
        }
    }
    if(typeof password != "string")
    {
        //throw "Error: Password was not given as an input.";
        res.sendFile(path.resolve('public/static/error.html'));
    }
    password = password.trim();
    for(i=0; i<password.length;i++)
    {
        let p = password.charCodeAt(i);
        if(p==32)
        {
            //throw "Error: Username was given a bad character."
            res.sendFile(path.resolve('public/static/error.html'));
        }
    }
    if(password.length <6)
    {
        //throw "Error: Password was not given as the right length.";
        res.sendFile(path.resolve('public/static/error.html'));

    }
    let result;
    try{
        result = await userData.checkUser(username,password)
    }
    catch(e)
    {
        res.sendFile(path.resolve('public/static/error.html'));
    }
   
    if(result)
    {
        req.session.user = {username: username};
        res.redirect('/private'); 
    }
    else
    {
        res.sendFile(path.resolve('public/static/error.html'));
    }

});
module.exports = router;