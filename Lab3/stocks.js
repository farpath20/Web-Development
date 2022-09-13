const people = require("./people.js");
const axios = require('axios');
async function getStocks(){
    const  {data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of people objects
  }
async function listShareholders()
{
    let data = await getStocks();
    let peopleData = await people.getPeople();
    for(const i of data)
    {
        for(const j of i["shareholders"])
        {
            person = await people.getPersonByIdData(j["userId"],peopleData);
            j["first_name"] = person["first_name"];
            j["last_name"] = person["last_name"];
            delete j["userId"];
        
        }
    }
    return data;
}
async function topShareholder(stockName)
{
   
    if (typeof stockName !== 'string')
    {
        throw "Error: Was not given a string";
    }
    stockName = stockName.trim();
    if(stockName.length==0)
    {
        throw "Error: Input is only white spacing"
    }
    let data = await listShareholders();
    let company =null;
    for(const i of data)
    {
        if(i["stock_name"]===stockName)
        {
            company = i;
        }
    }
    if(company==null)
    {
        throw "Error: Company does not exist."
    }
    if(company["shareholders"].length==0)
    {
        //return no investors
        return `${stockName} currently has no shareholders.`
    }
    let max = 0;
    let maxMemeber = null;
    for(const i of company["shareholders"])
    {
        if(max<i["number_of_shares"])
        {
            max = i["number_of_shares"];
            maxMemeber = i;

        }
    }
    return `With ${maxMemeber["number_of_shares"]} shares in ${stockName}, ${maxMemeber["first_name"]} ${maxMemeber["last_name"]} is the top shareholder.`
    //"With 372 shares in Nuveen Floating Rate Income Fund, Thorstein Sarjeant is the top shareholder."
    
}
async function listStocks(firstName, lastName)
{
    if(typeof firstName !== 'string' || typeof lastName !== 'string')
    {
        throw "Error: Was not given strings for inputs."
    }
    firstName = firstName.trim();
    lastName = lastName.trim();
    if(firstName.length==0||lastName.length==0)
    {
        throw "Error: Was only given white spaces."
    }
    let data = await listShareholders();
    let peopleData = await people.getPeople();
    let exist = false;
    for(const currentP of peopleData)
    {
        if(currentP["first_name"]===firstName&&currentP["last_name"]===lastName)
        {
            exist = true;
            break;
        }
    }
    if(exist===false)
    {
        throw "Error: Person does not exist."
    }
    let result  = [];
    for(const i of data)
    {
        
        for(const j of i["shareholders"])
        {
            if(j["first_name"]===firstName&&j["last_name"]===lastName)
            {
                let company = {stock_name: i["stock_name"],
                                number_of_shares: j["number_of_shares"]};
                result.push(company);
            }
        }

    }
    //check if they check specific errors
    if(result.length==0)
    {
        throw "Error: Did not own a stock";
    }
    return result;

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
module.exports=
{
    listShareholders,
    topShareholder,
    listStocks,
    getStockById
}