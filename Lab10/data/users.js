const { ObjectId } = require("bson");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require('bcryptjs');
const req = require("express/lib/request");
const saltRounds = 12;

async function createUser(username, password)
{
    if(typeof username  != "string")
    {
        throw "Error: Username was not given as an input.";
    }
    username = username.trim();
    if(username.length<4)
    {
        throw "Error: Username was not given a specific length.";
    }
    let ogPassword = username;
    username = username.toLowerCase();
    for(i=0; i<username.length;i++)
    {
        let p = username.charCodeAt(i);
        if(!(p>96&&p<123)&&!(p>47&&p<58))
        {
            throw "Error: Username was given a bad character."
        }
    }
    if(typeof password != "string")
    {
        throw "Error: Password was not given as an input.";
    }
    //check username
    const userCollection = await users();
    const findInfo = await userCollection.findOne({username:username});
    if(findInfo)
    {
        throw "Error: Username is already founded";
    }
    password = password.trim();
    for(i=0; i<password.length;i++)
    {
        let p = password.charCodeAt(i);
        if(p==32)
        {
            throw "Error: Password was given a bad character."
        }
    }
    if(password.length <6)
    {
        throw "Error: Password was not given as the right length.";
    }
    const hash = await bcrypt.hash(password, saltRounds);
    let result = {
        username: username.toLowerCase(),
        password: hash

    };
    const insertInfo = await userCollection.insertOne(result);
    console.log("hey");
    if(insertInfo ===0)
    {
        throw "Error: inserting to a user into the database "
    }
    console.log("pey");
    return {userInserted:true}
}
async function checkUser(username,password)
{
    //console.log(username);
    //console.log(password.length);
    if(typeof username  != "string")
    {
        throw "Error: Username was not given as an input.";
    }
    username = username.trim();
    if(username.length<5)
    {
        throw "Error: Username was not given a specific length.";
    }
    let ogPassword = username;
    username = username.toLowerCase();
    for(i=0; i<username.length;i++)
    {
        let p = username.charCodeAt(i);
        if(!(p>96&&p<123)&&!(p>47&&p<58))
        {
            throw "Error: Username was given a bad character."
        }
    }
    if(typeof password != "string")
    {
        throw "Error: Password was not given as an input.";
    }
    //check username
    const userCollection = await users();
    password = password.trim();
    for(i=0; i<password.length;i++)
    {
        let p = password.charCodeAt(i);
        if(p==32)
        {
            throw "Error: Password was given a bad character."
        }
    }
    console.log(password);
    console.log(password.length);
    if(password.length <6)
    {
        throw "Error: Password was not given as the right length.";
    }
    const findInfo = await userCollection.findOne({username:(username.toLowerCase())});
    console.log(findInfo);
    if(!findInfo)
    {
        throw "Either the username or password is invalid2.";
    }
    else{
        try {

            compareToMatch = await bcrypt.compare(password,findInfo["password"] );
            console.log(password.toLowerCase());
        } catch (e) {
            throw "Error can not bcrypt.";
        }
        if(compareToMatch)
        {
            return {authenticated: true};
        }
        else
        {
            throw "Either the username or password is invalid.";
        }
    }
    /*for(const i of userCollection)
    {
        if(i["username"].toLowerCase()==username)
        {
            try {
                compareToMatch = await bcrypt.compare(i["password"], password);
            } catch (e) {
                throw "Error can not bcrypt.";
            }
            if(compareToMatch)
            {
                return {authenticated: true};
            }
            else
            {
                throw "Either the username or password is invalid";
            }
        }
    }*/
}
module.exports={
    createUser,
    checkUser
}
