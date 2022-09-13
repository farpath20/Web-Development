const restaurants = require("./data/restaurants");
const connection = require("./config/mongoConnection");

const main = async function() {
    const db = await connection();
    try
    {
        var blaze =  await restaurants.create("Blaze Pizza", "Newark, NJ", "973-979-6893","http://www.blaze.com", "$$",["Pizza","Italian","Casual"], 8, {dineIn:true,takeOut:true,delivery:true});
        console.log(blaze);
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        var popeyes = await restaurants.create("Popeyes","Newport, NJ", "123-456-7890", "http://www.popeyes.com","$",["Chicken wings", "Sandwiches", "Fries"],9,{dineIn: true,takeOut:true,delivery:true});
        console.log(await restaurants.getAll());
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        var jollibee = await restaurants.create("Jollibee", "Edison, NJ", "098-765-4321", "http://www.popeyes.com","$",["Asian", "Chicken", "Sandwiches"],7,{dineIn:true, takeOut:true, delivery:false});
        console.log(jollibee);
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        blaze= await restaurants.rename(blaze._id,"http://www.newblaze.com");
        console.log(blaze);
    }
    catch(e)
    {
        console.log(e);
    }
    let deletedId = null;
    try
    {
        deletedId = jollibee._id;
        let peace = await restaurants.remove(jollibee._id);
        console.log(peace);
        console.log(await restaurants.getAll());
    }
    catch(e)
    {
        console.log(e);
    }
    
   try
    {
        let poke = await restaurants.create("Piki Poke", "Hoboken, NJ", "435-65431234","http://www.Pikipoke.com","$",["Hawain","Asian","Healthy"],8,{dineIn: true,takeOut:true,delivery:true});
    }
    catch(e)
    {
        console.log(e);
    }
    
    try
    {
        let test1  = await restaurants.remove("urtjfdnvtrhfj");
        console.log(test1);
    }
    catch(e)
    {
        console.log(e);
    }
    
    try
    {
        let test2 = await restaurants.rename("tsdfgrdgdtr","http://www.PoolBoys.com");
    }
    catch(e)
    {
        console.log(e);
    }
    
    try
    {
        let test3 = await restaurants.rename(jollibee._id,"http://www.cool.com");
    }
    catch(e)
    {
        console.log(e);
    }
    
    try
    {
        let test4 = await restaurants.get("rdferdvr43wgr");
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        let test5 = await restaurants.rename(deletedId,"http://www.coolio.com");
    }
    catch(e)
    {
        console.log(e);
    }
    try
    {
        let test6 = await restaurants.remove(deletedId);
    }
    catch(e)
    {
        console.log(e);
    }

   



/*

Questions to ask:
How to do the delete method
how to run the code


*/

await db.s.client.close();

}
//const db = await connection();
main();
//await db.s.client.close();