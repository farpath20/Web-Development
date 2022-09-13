function checkString(string)
{
    if(typeof string !== 'string')
    {
        throw "Error: Input was not given string";
    }
    if(string.length==0)
    {
        throw "Error: The string is empty";
    }
}
function sortString(string)
{
    checkString(string);
    checkEmptySpaces(string);
    let lowerCaseArray = [];
    let upperCaseArray = [];
    let specialCaseArray = [];
    let numberCaseArray = [];
    let spaceCaseArray = [];
    for(i = 0; i<string.length;i++)
    {
        if(string.charAt(i).charCodeAt(0)-'a'.charCodeAt(0)>=0&&string.charAt(i).charCodeAt(0)-'a'.charCodeAt(0)<=25)
        {
            lowerCaseArray.push(string.charAt(i));
        }
        else if(string.charAt(i).charCodeAt(0)-'A'.charCodeAt(0)>=0&&string.charAt(i).charCodeAt(0)-'A'.charCodeAt(0)<=25)
        {
            upperCaseArray.push(string.charAt(i));
        }
        else if(string.charAt(i).charCodeAt(0)-'0'.charCodeAt(0)>=0&&string.charAt(i).charCodeAt(0)-'9'.charCodeAt(0)<=8)
        {
            numberCaseArray.push(string.charAt(i));
        }
        else if(string.charAt(i).charCodeAt(0)-' '.charCodeAt(0)===0)
        {
            spaceCaseArray.push(string.charAt(i));
        }
        else
        {
            specialCaseArray.push(string.charAt(i));
        }

        
    }
    upperCaseArray.sort();
    lowerCaseArray.sort();
    numberCaseArray.sort();
    specialCaseArray.sort();
    result = [];
    result = upperCaseArray.concat(lowerCaseArray);
    result = result.concat(specialCaseArray);
    result = result.concat(numberCaseArray);
    result = result.concat(spaceCaseArray);
    let finalResult = result.join("");
    return finalResult;
}
function replaceChar(string, index)
{
    checkString(string);
    checkEmptySpaces(string);
    if(typeof index !== 'number'||!(index>0&&index<string.length-1))
    {
        throw "Error: Was not given the correct index";
    }
    let prev = string.charAt(index-1);
    let forward = string.charAt(index+1);
    let turn = 1;
    for(i = 0;i<string.length;i++)
    {
        if((string.charAt(i)===string.charAt(index))&&index!==i)
        {
            if(turn == 1)
            {
               
                string = string.substring(0,i) + prev + string.substring(i+1);

                turn = 2;
            }
        
            else
            {
                string = string.substring(0,i) + forward + string.substring(i+1);
                turn =1;
            }
        }
        
    }
    return string;
    
}
function checkEmptySpaces(string)
{
    //string = string.slice(" ")
    if(!(string.trim()))
    {
        throw "Error: Just empty spaces.";
    }
}
function mashUp(string1,string2,char) 
{
    checkString(string1);
    checkString(string2);
    checkString(char);
    if(char.length!=1)
    {
        throw "Error: char is suppose to be a letter"
    }
    checkEmptySpaces(string1);
    checkEmptySpaces(string2);
    checkEmptySpaces(char);
    result = [];

    for(i = 0; i<Math.max(string1.length,string2.length);i++)
    {
        if(i<string1.length)
        {
            result[i*2] = string1.charAt(i);
        }
        else
        {
            result[i*2] = char;
        }
        if(i<string2.length)
        {
            result[(i*2)+1] = string2.charAt(i);
        }
        else
        {
            result[(i*2)+1] = char;
        }
    }
    return result.join("");
}

module.exports={
    sortString,
    replaceChar,
    mashUp

}