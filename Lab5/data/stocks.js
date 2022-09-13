const axios = require('axios');
async function getStocks(){
    const  {data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of people objects
  }
  async function getStockById(id)
{
    if(typeof id !=="string")
    {
        throw "Error: Did not recieve a string."
    }
    id = id.trim();
    if(id.trim().length===0)
    {
        throw "Error: String is empty spaces"
    }
    let data = await getStocks();

    for(const i of data)
    {
        if(id===i["id"])
        {
            return i;
        }
    }
    throw "Error: Stock not found error."
}
module.exports = {
    getStocks,
    getStockById
}