const { ObjectId } = require("bson");
const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;


async function create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions)
{
    if(!name||!location|| !phoneNumber||!website||!priceRange||!cuisines||!serviceOptions)
    {
        throw "Error: Missing an arguement for the test.";
    }
    if(typeof name!="string"||typeof location!="string"||typeof phoneNumber!="string"||typeof website!="string"||typeof priceRange!="string")
    {
        throw "Error: When creating the Restaurants one of the arguements is not a string.";
    }
    phoneNumber = phoneNumber.trim();
    if(phoneNumber.length!=12||!(phoneNumber.charAt(3)==='-'&&phoneNumber.charAt(7)==='-'))
    {
        throw "Error: Phone Numbers were not formated correctly.";
    }
    website = website.trim();
    if(website.substring(0,11)!=="http://www."||website.substring(website.length-4,website.length)!==".com"||website.substring(11,website.length-4).length<5)
    {
        throw "Error: Websites were not formatted right.";
    }
    name = name.trim();
    location = location.trim();

    for(i=0;i<priceRange.length;i++)
    {
        if(priceRange.charAt(i)!=='$'||priceRange.length>5)
        {
            throw "Error: Price range was not formatted right or length not right.";
        }
    }
    if(!(Array.isArray(cuisines))||cuisines.length==0)
    {
        throw "Error: Cuisines is not an array or array is 0 length.";
    }
    for(let str of cuisines)
    {
        str = str.trim();

        if(typeof str !== 'string'||str.length==0)
        {
            throw "Error: Cuisines are not given strings.";
        }
    }
    if(typeof serviceOptions !== 'object')
    {
        throw "Error: Service was not an array.";
    }
    if(Array.isArray(serviceOptions))
    {
        throw "Error: Service was not an array.";
    }
    if(typeof serviceOptions["dineIn"]!=="boolean"||typeof serviceOptions["takeOut"]!== "boolean"||typeof serviceOptions["delivery"]!== "boolean")
    {
        throw "Error: Service was not given booleans.";
    }
    const restaurantCollection = await restaurants();
    let obj = {
        name:name,
        location:location,
        phoneNumber:phoneNumber,
        website:website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: 0,
        serviceOptions: serviceOptions,
        reviews: []
    };
    const insertInfo = await restaurantCollection.insertOne(obj);
    if (insertInfo.insertedCount === 0)
    {
        throw "Error: Did not insert right"
    }

    
    return obj;
    //return obj;
}
async function getAll()
{
    const restaurantCollection = await restaurants();

    const restaurantList = await restaurantCollection.find({}).toArray();
    for(const i of restaurantList )
    {
        i["_id"] =  i["_id"].toString();
    }

    return restaurantList;
}
async function get(id)
{
    if(typeof id !== "string")
    {
        throw "Error: was not given a String."
    }
    id = id.trim();
    if(id.length==0)
    {
        throw "Error: Id is just empty spaces."
    }
    let parseId = null;
    const restaurantCollection = await restaurants();
    try
    {
        parseId = ObjectId(id);
    }
    catch(e)
    {
        throw "Error: Id could not be converted to an ObjectId."
    }
    const place = await restaurantCollection.findOne({_id: parseId });
    //not a valid objectID check
    
    if (place === null) 
    {
        throw 'No restaurant with that id';
    }
    return place;
}
async function remove(id)
{
    if(typeof id !== "string")
    {
        throw "Error: was not given a String."
    }
    id = id.trim();
    if(id.length==0)
    {
        throw "Error: Id is just empty spaces."
    }
    const restaurantCollection = await restaurants();
    let parseId  =null;
    try
    {
        parseId = ObjectId(id);
    }
    catch(e)
    {
        throw "Error: Could not convert the String to a ObjectId"
    }
    const place = await restaurantCollection.findOne({ _id: parseId });
    const deletionInfo = await restaurantCollection.deleteOne({ _id: parseId });
    if (deletionInfo.deletedCount === 0) 
    {
        throw `Error: Could not delete restaurant with id of ${id}`;
    }
    return `${place["name"]} has been successfully deleted!`
    
}
async function update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions)
{
    if(!id||!name||!location|| !phoneNumber||!website||!priceRange||!cuisines||!serviceOptions)
    {
        throw "Error: Missing an arguement for the test.";
    }
    if(typeof name!="string"||typeof location!="string"||typeof phoneNumber!="string"||typeof website!="string"||typeof priceRange!="string")
    {
        throw "Error: When creating the Restaurants one of the arguements is not a string.";
    }
    phoneNumber = phoneNumber.trim();
    if(phoneNumber.length!=12||!(phoneNumber.charAt(3)==='-'&&phoneNumber.charAt(7)==='-'))
    {
        throw "Error: Phone Numbers were not formated correctly.";
    }
    website = website.trim();
    if(website.substring(0,11)!=="http://www."||website.substring(website.length-4,website.length)!==".com"||website.substring(11,website.length-4).length<5)
    {
        throw "Error: Websites were not formatted right.";
    }
    name = name.trim();
    location = location.trim();
    if(name.length==0||location.length==0)
    {
        throw "Error: Name or Location is an empty string";
    }

    for(i=0;i<priceRange.length;i++)
    {
        if(priceRange.charAt(i)!=='$'||priceRange.length>5)
        {
            throw "Error: Price range was not formatted right or length not right.";
        }
    }
    if(!(Array.isArray(cuisines))||cuisines.length==0)
    {
        throw "Error: Cuisines is not an array or array is 0 length.";
    }
    for(let str of cuisines)
    {
        str = str.trim();

        if(typeof str !== 'string'||str.length==0)
        {
            throw "Error: Cuisines are not given strings.";
        }
    }
    if(typeof serviceOptions !== 'object')
    {
        throw "Error: Service was not an array.";
    }
    if(Array.isArray(serviceOptions))
    {
        throw "Error: Service was not an array.";
    }
    if(typeof serviceOptions["dineIn"]!=="boolean"||typeof serviceOptions["takeOut"]!== "boolean"||typeof serviceOptions["delivery"]!== "boolean")
    {
        throw "Error: Service was not given booleans.";
    }
    if(typeof id !== "string")
    {
        throw "Error: was not given a String."
    }
    id = id.trim();
    if(id.length==0)
    {
        throw "Error: Id is just empty spaces."
    }
    const restaurantCollection = await restaurants();
    let parseId = null;
    try
    {
        parseId = ObjectId(id);
    }
    catch(e)
    {
        throw "Error: Could not convert id to ObjectId."
    }
    let obj ={
        name:name,
        location :location,
        phoneNumber:phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        serviceOptions:serviceOptions
    }
    const updatedInfo = await restaurantCollection.updateOne({_id:parseId},{$set:obj});
    if(updatedInfo.modifiedCount ==0)
    {
        throw "Error: Could not update anything."
    }
    return await get(id);
}


module.exports = {
create,
getAll,
get,
remove,
update
///Error message
}