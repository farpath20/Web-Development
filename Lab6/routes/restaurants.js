const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantData= data.restaurants;
router.get('/:id', async (req, res) => {
    try {
      if(typeof req.params.id != "string")
      {
        throw "Error: Was not given a string somehow."
      }
      const restaurant = await restaurantData.get(req.params.id);
      restaurant._id = restaurant._id.toString();
      res.status(200).json(restaurant);
    } catch (e) {
      res.status(404).json({ message: `Restaurant not found` });
    }
  });
router.get('/', async (req, res) => {
    try {
        const restaurantList = await restaurantData.getAll();
        let returnVal = []
        for(const i of restaurantList)
        {
            let obj  = {"_id":i._id.toString(),
                        "name": i.name};
            returnVal.push(obj);

        }
        res.status(200).json(returnVal);
    } catch (e) {
    res.status(500).send();
  }
});
router.post("/", async(req,res)=>{
  let bodyInfo = req.body;
  //console.log(bodyInfo);
  if(!bodyInfo)
  {
    res.status(400).json({ error:"Error: There is no data"});
  }
  if(!bodyInfo.name||!bodyInfo.location||!bodyInfo.phoneNumber||!bodyInfo.website||!bodyInfo.priceRange||!bodyInfo.cuisines||!bodyInfo.serviceOptions)
  {
    res.status(400).json({ error: "Error: Was not given all inputs"})
  }
  let name = bodyInfo.name;
  let location = bodyInfo.location;
  let phoneNumber = bodyInfo.phoneNumber;
  let website = bodyInfo.website;
  let priceRange = bodyInfo.priceRange;
  let cuisines = bodyInfo.cuisines;
  let serviceOptions = bodyInfo.serviceOptions;
  if(typeof name!="string"||typeof location!="string"||typeof phoneNumber!="string"||typeof website!="string"||typeof priceRange!="string")
  {
    res.status(400).json({ error: "Error: When creating the Restaurants one of the arguements is not a string."});
  }
  phoneNumber = phoneNumber.trim();
  if(phoneNumber.length!=12||!(phoneNumber.charAt(3)==='-'&&phoneNumber.charAt(7)==='-'))
  {
    res.status(400).json({ error:"Error: Phone Numbers were not formated correctly."});
  }
  website = website.trim();
  if(website.substring(0,11)!=="http://www."||website.substring(website.length-4,website.length)!==".com"||website.substring(11,website.length-4).length<5)
  {
    res.status(400).json({ error: "Error: Websites were not formatted right."});
  }
  name = name.trim();
  location = location.trim();

  for(i=0;i<priceRange.length;i++)
  {
      if(priceRange.charAt(i)!=='$'||priceRange.length>5)
      {
        res.status(400).json({ error: "Error: Price range was not formatted right or length not right."});
      }
  }
  if(!(Array.isArray(cuisines))||cuisines.length==0)
  {
    res.status(400).json({ error:"Error: Cuisines is not an array or array is 0 length."});
  }
  for(let str of cuisines)
  {
      str = str.trim();

      if(typeof str !== 'string'||str.length==0)
      {
        res.status(400).json({ error:"Error: Cuisines are not given strings."});
      }
  }
  if(typeof serviceOptions !== 'object')
  {
    res.status(400).json({ error:"Error: Service was not an array."});
  }
  if(Array.isArray(serviceOptions))
  {
    res.status(400).json({ error: "Error: Service was not an array."});
  }
  if(typeof serviceOptions["dineIn"]!=="boolean"||typeof serviceOptions["takeOut"]!== "boolean"||typeof serviceOptions["delivery"]!== "boolean")
  {
    res.status(400).json({ error: "Error: Service was not given booleans."});
  }
  try
  {
    const returnVal = await restaurantData.create(name,location,phoneNumber,website,priceRange,cuisines,serviceOptions)
    res.status(200).json(returnVal);
  }
  catch(e)
  {
    res.status(500).json({ error: e });
  }

});
router.put("/:id", async(req,res)=>{
  let bodyInfo = req.body;
  //console.log(bodyInfo);
  if(!bodyInfo)
  {
    res.status(400).json({ error:"Error: There is no data"});
  }
  if(!bodyInfo.name||!bodyInfo.location||!bodyInfo.phoneNumber||!bodyInfo.website||!bodyInfo.priceRange||!bodyInfo.cuisines||!bodyInfo.serviceOptions)
  {
    res.status(400).json({ error: "Error: Was not given all inputs"})
  }
  let name = bodyInfo.name;
  let location = bodyInfo.location;
  let phoneNumber = bodyInfo.phoneNumber;
  let website = bodyInfo.website;
  let priceRange = bodyInfo.priceRange;
  let cuisines = bodyInfo.cuisines;
  let serviceOptions = bodyInfo.serviceOptions;
  if(typeof name!="string"||typeof location!="string"||typeof phoneNumber!="string"||typeof website!="string"||typeof priceRange!="string")
  {
    res.status(400).json({ error: "Error: When creating the Restaurants one of the arguements is not a string."});
  }
  phoneNumber = phoneNumber.trim();
  if(phoneNumber.length!=12||!(phoneNumber.charAt(3)==='-'&&phoneNumber.charAt(7)==='-'))
  {
    res.status(400).json({ error:"Error: Phone Numbers were not formated correctly."});
  }
  website = website.trim();
  if(website.substring(0,11)!=="http://www."||website.substring(website.length-4,website.length)!==".com"||website.substring(11,website.length-4).length<5)
  {
    res.status(400).json({ error: "Error: Websites were not formatted right."});
  }
  name = name.trim();
  location = location.trim();

  for(i=0;i<priceRange.length;i++)
  {
      if(priceRange.charAt(i)!=='$'||priceRange.length>5)
      {
        res.status(400).json({ error: "Error: Price range was not formatted right or length not right."});
      }
  }
  if(!(Array.isArray(cuisines))||cuisines.length==0)
  {
    res.status(400).json({ error:"Error: Cuisines is not an array or array is 0 length."});
  }
  for(let str of cuisines)
  {
      str = str.trim();

      if(typeof str !== 'string'||str.length==0)
      {
        res.status(400).json({ error:"Error: Cuisines are not given strings."});
      }
  }
  if(typeof serviceOptions !== 'object')
  {
    res.status(400).json({ error:"Error: Service was not an array."});
  }
  if(Array.isArray(serviceOptions))
  {
    res.status(400).json({ error: "Error: Service was not an array."});
  }
  if(typeof serviceOptions["dineIn"]!=="boolean"||typeof serviceOptions["takeOut"]!== "boolean"||typeof serviceOptions["delivery"]!== "boolean")
  {
    res.status(400).json({ error: "Error: Service was not given booleans."});
  }
  try
  {
    const returnVal = await restaurantData.update(req.params.id,name,location,phoneNumber,website,priceRange,cuisines,serviceOptions)
    res.status(200).json(returnVal);
  }
  catch(e)
  {
    res.status(500).json({ error: e });
  }

  /*let bodyInfo = req.body;
  console.log(bodyInfo);
  if(!bodyInfo.name||!bodyInfo.location||!bodyInfo.phoneNumber||!bodyInfo.website||!bodyInfo.priceRange||!bodyInfo.cuisines||!bodyInfo.serviceOptions)
  {
    res.status(400).json({ error: "Error: Was given a single input."})
  }
  let store = null;
  try{
    store = restaurantData.get(req.params.id)
  }
  catch(e)
  {
    res.status(400).json({ error: "Error: Could not find restaurant."});
  }
  
  try{
    const returnVal = await restaurantData.update(store.name,store.location,store.phoneNumber,store.website,store.priceRange,store.cuisines,store.serviceOptions)
    res.json(returnVal);
  }
  catch(e)
  {
    res.status(500).json({ error: e });
  }*/






});
router.delete("/:id", async(req,res)=>{
  let bodyInfo = req.body;
  //console.log(bodyInfo);
  if(!bodyInfo)
  {
    res.status(400).json({ error:"Error: There is no data"});
  }
  try{
    await restaurantData.get(req.params.id)
  }
  catch{
    res.status(404).json({ error: 'Restaurant not found' });
  }
  try{
    await restaurantData.remove(req.params.id)
    res.sendStatus(200);
  }
  catch(e)
  {
    res.status(500).json({ error: 'Post not found' });
  }

});

module.exports = router; 