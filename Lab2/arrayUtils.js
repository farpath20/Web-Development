function arrayChecker(arrays){
    if(Array.isArray(arrays)==false)
    {
        throw "Error: Input is not given an array.";
    }
    if(arrays.length<=0)
    {
        throw "Error: Array is empty.";
    }
}
function average(arrays){
    arrayChecker(arrays);
    let x = 0;
    let sizes = 0;
    for(i = 0; i<arrays.length;i++)
    {
        arrayChecker(arrays[i]);
        //console.log(arrays[i][j].length);
        for(j=0;j<arrays[i].length;j++)
        {
            
            if(typeof arrays[i][j]!=='number')
            {
                throw `Error: ${arrays[i][j]} is not a number.`;
            }
            x+=arrays[i][j];
            sizes++;
            

        }
        

    }
    return Math.round(x/sizes);
}
function modeSquared(array)
{
    arrayChecker(array);
    let brackets = [array.length];
    
    let max= 0;
    for(i = 0; i<array.length;i++)
    {
        let repeat = 0;
        if(typeof array[i]!=='number')
        {
            throw `Error: ${array[i]} is not a number.`;
        }
        for(j = 0; j<array.length;j++)
        {
            if(array[i]===array[j]&&i!=j)
            {
                repeat++;
            }
        }
        if(max<repeat)
        {
            max = repeat;
        }
        brackets[i] = repeat;

    }
    let result = 0; 
    if(max==0)
    {
        return 0;
    }
    nums = [];
    for(i = 0; i<array.length;i++)
    {
        
        if(brackets[i]==max)
        {
            if(!(nums.includes(array[i])))
            {
                nums.push(array[i]);
                result += Math.pow(array[i],2);
            }
        }

    }
   // result = result/(max+1);
   // return Math.pow(result,2);
    return result;
}
function medianElement(array)
{
    //12345678
    //xxx  xxx  
    arrayChecker(array);
    let sortedArray = [];
    for(i = 0; i<array.length;i++)
    {
        if(typeof array[i]!=='number')
        {
            throw `Error: ${array[i]} is not a number.`;
        }
        sortedArray[i] = array[i];
    }
    let result = {};
   // let sortedArray = [];
    //sortedArray = array.copyWithin(0,array.length-1);
     sortedArray.sort();
    if(array.length%2==1)
    {
        let index = Math.round((sortedArray.length/2)-1);
        result[sortedArray[index]]=array.indexOf(sortedArray[index]);
        return result;
    }
    else
    {
        let index1  =sortedArray.length/2;
        let index2 = (sortedArray.length/2)-1;
        if(sortedArray[index1]!==sortedArray[index2])
        {
            let returnVal = (sortedArray[index1]+sortedArray[index2])/2;
            result[returnVal] = Math.max(array.indexOf(sortedArray[index1]),array.indexOf(sortedArray[index2]));
            return result;

        }
        else
        {
            result[sortedArray[index2]] = array.indexOf(sortedArray[index2]);
            return result;
        }
    }  
}
function merge(arrayOne, arrayTwo)
{
    
    arrayChecker(arrayOne);
    arrayChecker(arrayTwo);
    lowerCaseArray = [];
    upperCaseArray = [];
    numberArray=[];
    let maxLength= Math.max(arrayOne.length, arrayTwo.length);
    for(i = 0; i <maxLength; i++)
    {
        if(i<arrayOne.length)
        {
            if(typeof arrayOne[i]!=='number'&&typeof arrayOne[i]!=='string')
            {
                throw `Error: ${arrayOne[i]} is not a number or string.`
            }
        }
        if(i<arrayTwo.length)
        {
            if(typeof arrayTwo[i]!=='number'&&typeof arrayTwo[i]!=='string')
            {
                throw `Error: ${arrayTwo[i]} is not a number or string.`
            }
        }
    }
    let result = arrayOne.concat(arrayTwo);
    for(i=0; i<result.length;i++)
    {
        if(typeof result[i]!=='number')
        {
            if(result[i].charCodeAt(0)-'a'.charCodeAt(0)>=0&&result[i].charCodeAt(0)-'a'.charCodeAt(0)<=25)
            {
                lowerCaseArray.push(result[i]);
            }
            else if(result[i].charCodeAt(0)-'A'.charCodeAt(0)>=0&&result[i].charCodeAt(0)-'A'.charCodeAt(0)<=25)
            {
                upperCaseArray.push(result[i]);
            }
            else
            {
                throw `Error: ${result[i]} is not a acceptable char.`;
            }
        }
        else
        {
            numberArray.push(result[i]);
        }
    }
    lowerCaseArray.sort();
    upperCaseArray.sort();
    numberArray.sort();

    result=lowerCaseArray.concat(upperCaseArray);
    result = result.concat(numberArray);

    return result;

}
module.exports={
    average,
    modeSquared,
    medianElement,
    merge
};