function objectChecker(object){
    if(typeof object !== 'object')
    {
        throw "Error: The input was not given an object";
    }
    if(Object.keys(object).length==0)
    {
        throw "Eroor: The input object are empty";
    }

}

function computeObjects(objects, func)
{
    let resultObj = {};
    if(Array.isArray(objects)==false)
    {
        throw "Error: Input is not given an array.";
    }
    if(objects.length<1)
    {
        throw "Error: The Array length is less than 1";

    }
    if(typeof func !== 'function')
    {
        throw "Error: The input was not given a proper function";
    }
    for(i =0; i<objects.length;i++)
    {
        objectChecker(objects[i]);
        for(const keys in objects[i])
        {
            if(typeof objects[i][keys]!== 'number' )
            {
                throw `Error: ${objects[i][keys]} is not a number.`;
            }
            if(!(Object.keys(resultObj).includes(keys)))
            {
                resultObj[keys] = func(objects[i][keys]);
            }
            else
            {
                resultObj[keys] += func(objects[i][keys]);
            }
        }
}
    return resultObj;

}
function commonKeys(obj1, obj2)
{ 
    let result = {};
    if(typeof obj1 !== 'object')
    {
        throw "Error: The input was not given an object";
    }
    if(typeof obj2 !== 'object')
    {
        throw "Error: The input was not given an object";
    }
    for(const keys in obj1)
    {
        if(Object.keys(obj2).includes(keys))
        {
            if(typeof obj1[keys] === "object"&& typeof obj2[keys]=== "object")
            {
                result[keys] =commonKeys(obj1[keys],obj2[keys]);
            }
            if(obj2[keys]===obj1[keys])
            {
                result[keys] = obj1[keys];
            }
            
        }
        
    }
    return result;

}
function flipObject(object)
{
    let result = {};
    objectChecker(object);
    for(const keys in object)
    {
        if(typeof object[keys] === 'object')
        {
           result[keys] = flipObject(object[keys]);
        }
        else
        {
            result[object[keys]]= keys;
        }
        
        
    }
    return result;
}
module.exports = {
    computeObjects,
    commonKeys,
    flipObject
}