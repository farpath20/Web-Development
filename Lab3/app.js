const lab3People = require("./people.js");
const lab3Stocks = require("./stocks.js");
async function main1()
{
    try
    {
        console.log(await lab3People.getPersonById("cafce8e0-514c-4e9b-a625-35e235189875"));
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        console.log(await lab3People.getPersonById(null));
    }
    catch(e)
    {
        console.log(e);
    }
    
}
async function main2()
{
    try
    {
        console.log(await lab3People.sameStreet("Larry", "Alley") );
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        console.log(await lab3People.sameStreet("Starling", "Hill") );
    }
    catch(e)
    {
        console.log(e);
    }
}
async function main3()
{
    try
    {
        console.log(await lab3People.manipulateSsn() );
    }
    catch(e)
    {
        console.log(e);
    }
}
async function main4()
{
    try
    {
        console.log(await lab3People.sameBirthday("1","20"))
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        console.log(await lab3People.sameBirthday(2,29))
        
    }
    catch(e)
    {
        console.log(e);
    }
}
async function main5()
{
    try
    {
        console.log(await lab3Stocks.listShareholders());
    }
    catch(e)
    {
        console.log(e);
    }
}
async function main6()
{
    try
    {
        //console.log(await lab3Stocks.topShareHolders("Nuveen Preferred and Income 2022 Term Fund"));
        //With 285 shares in Nuveen Preferred and Income 2022 Term Fund, Nilson Dressell is the top shareholder.
        console.log(await lab3Stocks.topShareholder('Aeglea BioTherapeutics, Inc.'));
        //With 449 shares in Aeglea BioTherapeutics, Inc., Caresse Clissett is the top shareholder.
        //With 449 shares in Aeglea BioTherapeutics, Inc., Caresse Clissett is the top shareholder.

    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        console.log(await lab3Stocks.topShareholder("         "));
    }
    catch(e)
    {
        console.log(e);
    }
}
async function main7()
{
    try
    {
        console.log(await lab3Stocks.listStocks("Grenville", "Pawelke" ));
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        console.log(await lab3Stocks.listStocks("Faraz", "Pathan"))
    }
    catch(e)
    {
        console.log(e);
    }
}
async function main8()
{
    try
    {
        console.log(await lab3Stocks.getStockById("822a1834-c881-4eb0-9303-ee07b208ba9f"))
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        console.log(await lab3Stocks.getStockById("842a1834-c881-4eb0-9303-ee07b208ba9f"))
    }
    catch(e)
    {
        console.log(e);
        //Supposed to return Error: stock not found
    }
}

main1();
main2();
main3();
main4();
main5();
main6();
main7();
main8();


//Questions to ask 

//Error of the prev method of list of stocks and if they would affect every stock.