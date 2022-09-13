const express = require('express');
const router = express.Router();
const data = require('../data');
const userData= data.users;
const path = require('path');
router.get("/", async(req, res) =>{
    res.sendFile(path.resolve('public/static/signupForm.html'));

});
router.post("/", async(req,res) =>{
    let username  = req.body.username;
let password = req.body.password;
if(typeof username  != "string")
    {
        return res.sendFile(path.resolve('public/static/errorSign.html'));
    }
    username = username.trim();
    if(username.length<4)
    {
       return  res.sendFile(path.resolve('public/static/errorSign.html'));
    }
    let ogPassword = username;
    username = username.toLowerCase();
    for(i=0; i<username.length;i++)
    {
        let p = username.charCodeAt(i);
        if(!(p>96&&p<123)&&!(p>47&&p<58))
        {
            return res.sendFile(path.resolve('public/static/errorSign.html'));
        }
    }
    if(typeof password != "string")
    {
        return res.sendFile(path.resolve('public/static/errorSign.html'));
    }
    password = password.trim();
    for(i=0; i<password.length;i++)
    {
        let p = password.charCodeAt(i);
        if(p==32)
        {
           return res.sendFile(path.resolve('public/static/errorSign.html'));
        }
    }
    if(password.length <6)
    {
        return res.sendFile(path.resolve('public/static/errorSign.html'));
    }
    let result;
    try{
    result = await userData.createUser(username,password);
    }
    catch(e){
        return res.sendFile(path.resolve('public/static/errorSign.html'));
    }
    //console.log(await userData.createUser(username,password)["userInserted"]);
    if(result)
    {
        res.redirect("/");
    }
    else
    {
        res.status(400).json({error: ""})//Error needs to change for later
    }
});
module.exports = router;