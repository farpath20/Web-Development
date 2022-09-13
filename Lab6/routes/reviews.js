const express = require('express');
const router = express.Router();
const data = require('../data');
const { ObjectId } = require("bson");
const reviewsData= data.reviews;
const restaurantData = data.restaurants;
router.get('/:id', async (req, res) => {
    try{
      await restaurantData.get(req.params.id)
    }
    catch(e)
    {
      res.status(404).json({ error: `Cannot find the Restaurant` });
    }

    try
    {
      const returnRes = await reviewsData.getAll(req.params.id);
      if(returnRes.length!=0)
      {
        res.status(200).json(returnRes);
      }
      else
      {
        res.status(404).json({ error: `No reviews in the restaurant` });
      }
    }
    catch(e)
    {
      res.status(500).send();
    }
  });
  router.post('/:id', async (req, res) => {
    let bodyInfo = req.body;
    //console.log(bodyInfo);
    if(!bodyInfo)
    {
      res.status(400).json({ error:"Error: There is no data"});
    }
    if(!bodyInfo.title||!bodyInfo.reviewer||!bodyInfo.rating||!bodyInfo.dateOfReview||!bodyInfo.review)
    {
      res.status(400).json({ error:"Error: Not all data was given"});
    }

    if(typeof bodyInfo.title != "string"||typeof bodyInfo.reviewer !="string"||typeof bodyInfo.dateOfReview !="string"||typeof bodyInfo.review != "string")
    {
      res.status(400).json({ error:"Error: Wrong type of data"});
    }
    let restaurantId =req.params.id ;
    let title = bodyInfo.title;
    let reviewer =bodyInfo.reviewer;
    let rating =bodyInfo.rating;
    let dateOfReview  = bodyInfo.dateOfReview;
    let review = bodyInfo.review;
    restaurantId = restaurantId.trim();
    title = title.trim();
    reviewer = reviewer.trim();
    dateOfReview = dateOfReview.trim();
    review = review.trim();
    if(restaurantId.length==0||title.length==0||reviewer.length==0||dateOfReview.length==0||review.length==0)
    {
      res.status(400).json({ error:"Error: Was given empty strings"});;
    }
    let restaur = null;
    try
    {
        restaur = await restaurantData.get(restaurantId);
    }
    catch(e)
    {
      res.status(400).json({ error:"Error: Restaurant Id cannot be found"});
    }
    if(rating<1 || rating>5)
    {
      res.status(400).json({ error:"Error: Rating is not in between the range"});
    }
    let day = new Date(dateOfReview);
    let today = new Date();

    if(day.toString()=='Invalid Date')
    {
      res.status(400).json({ error:"Error: Not a valid Date"});
    }
    
    if(day.getDate()!=today.getDate()||day.getFullYear()!=today.getFullYear()||day.getMonth()!=today.getMonth())
    {
      res.status(400).json({ error:"Error: The date is not Today."});
    }
    let parseId = null;
    try
    {
      parseId = ObjectId(restaurantId);
    }
    catch(e)
    {
        throw "Error: Could not convert id to ObjectId."
    }
    try{
      const returnRes = await reviewsData.create(restaurantId, title,reviewer,rating,dateOfReview,review);
      res.status(200).json(returnRes);
    }
    catch(e)
    {
      res.status(500).send();
    }


  });
router.get('/review/:id', async (req, res) => {
  try{
    
    let resultRet = await reviewsData.get(req.params.id);
    res.status(200).json(resultRet);
   }
   catch(e)
   {
    res.status(404).json({ error:"Error: Could not Find a review with that Id."});
   }
});
router.delete('/:id', async (req, res) => {
  try{
    await reviewsData.remove(req.params.id);
    let obj ={"reviewId":req.params.id,
              "deleted":true};
    res.status(200).json(obj);
                  
  }
  catch(e)
  {

  }
});
module.exports = router; 