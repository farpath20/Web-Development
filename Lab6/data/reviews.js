const { ObjectId } = require("bson");
const mongoCollections = require("../config/mongoCollections");
const restaurant = require("./restaurants.js");
const rest = mongoCollections.restaurants;

async function create(restaurantId, title, reviewer, rating, dateOfReview, review)
{
    if(!restaurantId||!title||!reviewer||!rating||!dateOfReview||!review)
    {
        throw "Error: Was not given all the inputs."
    }
    
    if(typeof restaurantId != "string"||typeof title != "string"||typeof reviewer !="string"||typeof dateOfReview !="string"||typeof review != "string")
    {
        throw "Error: Input was not given a string when it was supposed to.";
    }
    restaurantId = restaurantId.trim();
    title = title.trim();
    reviewer = reviewer.trim();
    dateOfReview  = dateOfReview.trim();
    review = review.trim();
    if(restaurantId.length==0||title.length==0||reviewer.length==0||dateOfReview.length==0||review.length==0)
    {
        throw "Error: Was given an empty string.";
    }
    let res = null;
    try
    {
        res = await restaurant.get(restaurantId);
    }
    catch(e)
    {
        throw e;
    }
    if(rating<1 || rating>5)
    {
        throw "Error: Rating is not between 1-5.";
    }
    let day = new Date(dateOfReview);
    let today = new Date();

    if(day.toString()=='Invalid Date')
    {
        throw "Error: Was given an ivalid date"
    }
    
    if(day.getDate()!=today.getDate()||day.getFullYear()!=today.getFullYear()||day.getMonth()!=today.getMonth())
    {
        throw "Error: Date is not today."
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
    let obj = {
        _id: new ObjectId().toString(),
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review
    }
    
    let restCollection = await rest();
    res.reviews.push(obj);
    const reviewOfRest = res.reviews;
    //reviewOfRest.push(obj);
    const updateInfo = await restCollection.updateOne({_id:parseId},{$set:{reviews:reviewOfRest}});

    if(updateInfo.modifiedCount==0)
    {
        throw "Error: Did not update reviews."
    }
    await updateOverallRating(res);
    
    return await restCollection.findOne({_id:parseId});

}
async function getAll(restaurantId)
{
    if(!restaurantId)
    {
        throw "Error: Was not given a input."
    }
    if(typeof restaurantId != "string")
    {
        throw "Error: was not given a string."
    }
    try
    {
        let rest = await restaurant.get(restaurantId);
        return rest.reviews;
    }
    catch(e)
    {
        throw e;
    }

}
async function get(reviewId)
{
    if(!reviewId)
    {
        throw "Error: Was not given input.";
    }
    reviewId= reviewId.trim();
    if(reviewId.length == 0)
    {
        throw "Error: Was given a empty string of reviewId.";
    }
    if(typeof reviewId != "string")
    {
        throw "Error: Was not given strings."
    }
    let parseId=null;
    try
    {
        parseId = ObjectId(reviewId);
    }
    catch(e)
    {
        throw "Error: Could not convert the ID to an objectId."
    }
    let restaurantCollection = await restaurant.getAll();
    for(i = 0; i<restaurantCollection.length;i++)
    {
        let reviewList = await getAll(restaurantCollection[i]._id.toString())
        for(j = 0;j<reviewList.length;j++)
        {
            if(reviewList[j]._id.toString()===parseId.toString())
            {
                return restaurantCollection[i].reviews[j];
            }
        }
    }
    throw "Error: Could not find review."
    /*let reviewCollection = await reviews();
    const foundReview = await reviewCollection.findOne({_id: parseId });
    if(foundReview === null)
    {
        throw "Error: Could not find a review."
    }
    return foundReview;*/

}

async function updateOverallRating(res)
{
    let rating = 0;
    for(i = 0; i<res.reviews.length;i++)
    {
        rating += res.reviews[i].rating;
    }
    rating = rating/res.reviews.length;
    let restCollection = await rest();
    let parseId = null;
    try{
        parseId = ObjectId(res._id)
    }
    catch(e)
    {
        throw "Error: could not update Restaurant."
    }
    const updateInfo = await restCollection.updateOne({_id:parseId},{$set:{overallRating:rating}});
    if(updateInfo.modifiedCount==0)
    {
        throw "Error: Did not update reviews."
    }

}
async function remove(removeId)
{
    if(!removeId)
    {
        throw "Error: Was not given any input."
    }
    if(typeof removeId !="string")
    {
        throw "Error: Was not given string.";
    }
    let parseId = null;
    try
    {
        parseId = ObjectId(removeId);
    }
    catch(e)
    {
        throw "Was not a valid objectId"
    }
    let restCollection = await rest();
    let restaurantCollection = await restaurant.getAll();
    for(i = 0; i<restaurantCollection.length;i++)
    {
        let reviewList = await getAll(restaurantCollection[i]._id.toString())
        for(j = 0;j<reviewList.length;j++)
        {
            if(reviewList[j]._id.toString()===parseId.toString())
            {
                reviewList = reviewList.splice(0,j).concat( reviewList.splice(j+1));
                
                const updateInfo = await restCollection.updateOne({_id: ObjectId(restaurantCollection[i]._id)},{$set:{reviews:reviewList}});
                if(updateInfo.modifiedCount==0)
                {
                    throw "Error: Did not update reviews."
                }
                updateOverallRating(await restaurant.get(restaurantCollection[i]._id.toString()));
                return;
            }
        }
    }
    throw "Error: Could not find review."
   /* for(const i of restaurantCollections)
    {
        
            updateOverallRating(i);
            let restCollection = await rest()
            totReviews= i.reviews.splice(i,i+1);
            const updateInfo = await restCollection.updateOne({_id:parseId},{$set:{reviews:reviewsCollections}});
            if(updateInfo.modifiedCount==0)
            {
                throw "Error: Did not update reviews."
            }

        }
        else
        {
            throw "Error: Did not delete the review."
        }
    }
}
    /*let currentReview = await get(removeId);
    //let restaurantRev = await restaurant.get(currentReview._id.toString());

    let totReviews = restaurantRev.reviews;
    let reviewCollection  = await reviews();
    let restaurantCollection = await restaurant();

    for(i=0;i< totReviews.length;i++)
    {
        if(totReviews[i]===currentReview)
        {
            
            totReviews= totReviews.splice(i,i+1);
            
            const updateInfo = await restaurantCollection.updateOne({_id:restaurantRev._id},{$set:{reviews:totReviews}});
            if(updateInfo.modifiedCount==0)
            {
                throw "Error: Did not update reviews."
            }
            const deletionInfo = await reviewsColletion.deleteOne({ _id: currentReview._id });
            if(deletionInfo.deletedCount==0)
            {       
                throw "Error: Did not delete."
            }
        }
    }*/
}
    
    




module.exports = {
    create,
    getAll,
    get,
    remove
}