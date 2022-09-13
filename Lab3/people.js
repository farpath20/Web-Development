const axios = require('axios');

async function getPeople(){
    const  {data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
  }
function checkEmptySpaces(id)
{
    id =id.trim();
    if(id.length==0)
    {
        throw "Error: String is just empty spaces.";
    }
}
async function getPersonById(id)
{
    if(typeof id !=='string')
    {
        throw "Error: Expected a String.";
    }
    let data = await getPeople();
    id =id.trim();
    checkEmptySpaces(id);
    for(i = 0; i<data.length;i++)
    {
        if(data[i]["id"]===id)
        {
            return data[i];
        }
    }
    throw "Error: Person not found";
      

}
async function getPersonByIdData(id,data)
{
    if(typeof id !=='string')
    {
        throw  `Error: Expected a String.`;
    }
    //let data = await getPeople();
    id = id.trim();
    checkEmptySpaces(id);
    for(i = 0; i<data.length;i++)
    {
        if(data[i]["id"]===id)
        {
            return data[i];
        }
    }
    throw "Person not found";
      

}
async function sameStreet(streetName,streetSuffix)
{
    if(typeof streetName !== 'string')
    {
        throw `Error: ${streetName} is not a string.`
    }
    if(typeof streetSuffix !== 'string')
    {
        throw `Error: ${streetSuffix} is not a string.`
    }
    streetName = streetName.trim();
    streetSuffix = streetSuffix.trim();
    checkEmptySpaces(streetName);
    checkEmptySpaces(streetSuffix);
    
    let data = await getPeople();
    streetName = streetName.toLowerCase();
    streetSuffix = streetSuffix.toLowerCase();
    let result = [];
    for(i=0;i<data.length;i++)
    {
        let currentHSN = data[i]['address']['home']['street_name'].toLowerCase();
        let currentHSS = data[i]['address']['home']['street_suffix'].toLowerCase();
        let currentWSN = data[i]['address']['work']['street_name'].toLowerCase();
        let currentWSS = data[i]['address']['work']['street_suffix'].toLowerCase();
        if(((currentHSN===streetName)&&(currentHSS===streetSuffix))||((currentWSN===streetName)&&(currentWSS===streetSuffix)))
        {
            result.push(data[i]);
        }
    }
    if(result.length<2)
    {
        throw  `Error: There is less than 2 people who lives on ${streetName} ${streetSuffix}.`;
    }
    return result;

}
async function manipulateSsn()
{
    let data = await getPeople();
    let average = 0;
    let max = 0;
    let low = 1000000000;
    let result = {"highest": {"firstName":"","lastName":""},
                  "lowest":{"firstName":"","lastName":""},
                    "average":0 }
    for(i = 0;i<data.length;i++)
    {
        let social = data[i]["ssn"].split('');
        social[3]= '0';
        social[6]='0';
        social.sort();
        social = Number(social.join(""));
        average+= social;
        if(social>max)
        {
            max = social;
            result["highest"]["firstName"] = data[i]["first_name"];
            result["highest"]["lastName"] = data[i]["last_name"];
        }
        if(social<low)
        {
            low = social;
            result["lowest"]["firstName"] = data[i]["first_name"];
            result["lowest"]["lastName"] = data[i]["last_name"];
        }  
    }
    average = Math.floor(average/data.length);
    result["average"] = average;
    return result;

}
function checkString(month,day)
{
    if(typeof month !== 'number')
    {
        throw "Error: Was not given a number for month.";
    }
    if(typeof day !== 'number')
    {
        throw "Error: Was not given a number for day.";
    }
    if(!(month>0&&month<13))
    {
        throw "Error: Month is not within the range that is possible";
    }
    if(!(day>0&&day<32))
    {
        throw "Error: Days is not within the range that is possible";
    }
    if(month==2&&day>28)
    {
        throw "Error: There is at most 28 days of Febuary.";
    }
    if (month==4 &&day>30)
    {
        throw "Error: There is at most 30 days of April.";
    }
    if (month==6 &&day>30)
    {
        throw "Error: There is at most 30 days of June.";
    }
    if (month==9 &&day>30)
    {
        throw "Error: There is at most 30 days of September.";
    }
    if (month==11 &&day>30)
    {
        throw "Error: There is at most 30 days of November.";
    }
}
async function sameBirthday(month,day)
{
    if(typeof month ==='string')
    {
        month = Number(month);
    }
    if(typeof day ==='string')
    {
        day = Number(day);
    }
    checkString(month,day);
    let data = await getPeople();
    result =[];
    for(i  = 0; i<data.length;i++)
    {
        let dob = data[i]["date_of_birth"];
        let pday = Number(dob.substring(3,5));
        let pmonth = Number(dob.substring(0,2));
        if(pday===day&&pmonth===month)
        {
            result.push(data[i]["first_name"]+" "+data[i]["last_name"]);
        }
    }
    if(result.length==0)
    {
        throw "Error: There is nobody with that birthday."
    }
    return result;
}
module.exports={
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday,
    getPersonByIdData,
    getPeople
}

