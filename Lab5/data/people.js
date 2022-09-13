const axios = require('axios');

async function getPeople(){
    const  {data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
  }
  async function getPersonById(id)
{
    if(typeof id !=='string')
    {
        throw "Error: Expected a String.";
    }
    let data = await getPeople();
    id =id.trim();
    for(i = 0; i<data.length;i++)
    {
        if(data[i]["id"]===id)
        {
            return data[i];
        }
    }
    throw "Error: Person not found";
}
module.exports = {
    getPeople,
    getPersonById
}