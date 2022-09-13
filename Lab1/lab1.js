const questionOne = function questionOne(arr) {
    let returnVal = {};
    //console.log(arr.length);
    if(Array.isArray(arr)==false)
    {
        return returnVal;
    }
    for(i=0;i<arr.length;i++)
    {
        let value = arr[i]
        value = Math.abs((Math.pow(value, 2))-7);
        let prime = false;
        for(j=2;j<value;j++)
        {
            if(value%j!==0)
            {
                prime = true;
                break;
            }
        }
        
        returnVal[value]=prime;
    }
    return returnVal;
}

const questionTwo = function questionTwo(arr) { //use includes
    let returnResult = [];
    for(i=0;i<arr.length;i++)
    {
       if(returnResult.includes(arr[i])==false)
       {
           returnResult.push(arr[i]);

       }
    }
    return returnResult;
  
}
function checkStrings(str1, str2){
    str1 = str1.split('').sort().join('');
    str2 = str2.split('').sort().join('');
    if(str1===str2)
    {
        return true;
    }
    return false;

}

const questionThree = function questionThree(arr) {
    arr= questionTwo(arr);
    let returnVal = {}
    for(i =0;i<arr.length;i++)
    {
        let arrStr = [];
        for(j = 0; j<arr.length;j++)
        {
            if(checkStrings(arr[i],arr[j]))
            {
                arrStr.push(arr[j])
            }
        }
        if(arrStr.length>1)
        {
            returnVal[arr[i].split('').sort().join('')]= arrStr;
        }
    }
    return returnVal;
}

const questionFour = function questionFour(num1, num2, num3) {
   
    totNum1 = 1;
    totNum2 = 1;
    totNum3 = 1;
    for(i = num1; i>1;i--)
    {
        totNum1 *=i;
        //console.log("Poop1");
    }
    for(i = num2; i>1;i--)
    {
        totNum2 *=i;
       // console.log("Poop2");
    }
    for(i = num3; i>1;i--)
    {
        totNum3 *=i;
       // console.log("Poop3");
    }

  /*  console.log(totNum1);
    console.log(totNum2);
    console.log(totNum3);*/
    denom = (num1+num2+num3)/3
    total = Math.floor((totNum1+totNum2+totNum3)/denom);
    //console.log(total);
    return total
}

module.exports = {
    firstName: "Faraz", 
    lastName: "Pathan", 
    studentId: "10445303",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};