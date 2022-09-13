const lab2Objects = require("./objectUtils");
const lab2Arrays = require("./arrayUtils");
const lab2Strings = require("./stringUtils")
try
{
    const meanOne = lab2Arrays.average([[1,6,5,4,3,6],[7,6,4,3,5,6]]);
    console.log("Mean Is successful and the result is "+ meanOne);
}
catch(e)
{
    console.log("Mean is wrong");
}
try
{
    const meanOne = lab2Arrays.average([[1,6,5,4,3,6],[]]);
    console.log("Mean Is unsuccessful and the result is "+ meanOne);
}
catch(e)
{
    console.log("Mean is wrong in the right time");
}
console.log(" ");
try
{
    const modeSquaredEx = lab2Arrays.modeSquared([5,6,3,4,5,6,7,4,5,6,7]);
    console.log("ModeSquared is successful and the result is "+ modeSquaredEx);
}
catch(e)
{
    console.log("ModeSquared is wrong");
}
try
{
    const modeSquaredEx = lab2Arrays.modeSquared([5,6,3,4,5,"error",7,4,5,6,7]);
    console.log("ModeSquared is unsuccessful and the result is "+ modeSquaredEx);
}
catch(e)
{
    //console.log("ModeSquared is wrong in the right time");
    console.log(e);
}
console.log(" ");
try
{
    const medianElementEx = lab2Arrays.medianElement([2,3,4,5,3,2,4,5,2,1,3,6]);
    //                                                1,2,2,2,3,3,3,4,4,5,5,6
    //                                                x,x,x,x,x,      x,x,x,x should be 3
    console.log("MedianElements is right and the result is " + medianElementEx);
}
catch(e)
{
    console.log("MedianElements is wrong.");
}
try
{
    const medianElementEx = lab2Arrays.medianElement([2,3,4,5,3,2,4,"loopy",2,1,3,6]);
    //                                                1,2,2,2,3,3,3,4,4,5,5,6
    //                                                x,x,x,x,x,      x,x,x,x should be 3
    console.log("MedianElements is not right and the result is " + medianElementEx);
}
catch(e)
{
    console.log("MedianElements is wrong in the right way.");
}
console.log(" ");
try
{
    const mergeEx = lab2Arrays.merge([1,2,3,4,5],["t","T","a","A",0]);
    console.log("Merge is right and the result is "+ mergeEx);
}
catch(e)
{
    console.log("Merge is wrong");
}
try
{
    const mergeEx = lab2Arrays.merge();
    console.log("Merge is not right and the result is "+ mergeEx);
}
catch(e)
{
    console.log("Merge is wrong in the right way");
}
console.log(" ");
try
{
    const sortEx = lab2Strings.sortString("12udfhfb45hER ^%$#");
    console.log("SortStrings is successful and the result is "+ sortEx);
}
catch(e)
{
    console.log("SortStrings is wrong");
}
try
{
    const sortEx = lab2Strings.sortString("");
    console.log("SortStrings is unsuccessful and the result is "+ sortEx);
}
catch(e)
{
    console.log("SortStrings is wrong in a right way");
}
console.log(" ");
try
{
    const replaceCharEx = lab2Strings.replaceChar("Loooopy",1);
    console.log("ReplaceChar is successful and the result is "+ replaceCharEx);
}
catch(e)
{
    console.log("ReplaceChar is wrong.");
}
try
{
    const replaceCharEx = lab2Strings.replaceChar("Loooopy",0);
    console.log("ReplaceChar is unsuccessful and the result is "+ replaceCharEx);
}
catch(e)
{
    console.log("ReplaceChar is wrong in a right way.");
}
console.log("  ")
try
{
    const mashUpEx = lab2Strings.mashUp("tfdgf","yetdgfuy","Q");
    console.log("MashUp is successful and the result is "+ mashUpEx);
}
catch(e)
{
    console.log("MashUp is wrong");
}
try
{
    const mashUpEx = lab2Strings.mashUp("tfdgf","yetdgfuy");
    console.log("MashUp is unsuccessful and the result is "+ mashUpEx);
}
catch(e)
{
    console.log("MashUp is wrong in the right way");
}
console.log("   ");
try
{
    const first = { x: 2, y: 3, p: 9};
    const second = { a: 70, x: 4, z: 5 , l: 1};
    const computeObjectsEx = lab2Objects.computeObjects([first,second], x=> x+5);
    console.log("ComputeObjects is successful and the result is "+computeObjectsEx);
}
catch(e)
{
    console.log(e);
}
try
{
    const first = { x: "loop", y: 3, p:9};
    const second = { a: 70, x: 4, z: 5 , l:1};

    const computeObjectsEx = lab2Objects.computeObjects([first,second],x=> x+5);
    console.log("ComputeObjects is successful and the result is "+computeObjectsEx);
}
catch(e)
{
    console.log("ComputeObjects is wrong in the right way");
}
console.log("  ");
try
{
    const third = {a: 2, b: {x: 7},c:5,k:7};
    const fourth = {a: 3, b: {x: 7, y: 10},c:3,k:7};
    const commonKeysEx = lab2Objects.commonKeys(third,fourth)
    console.log("CommonKeys is successful and the result is "+ commonKeysEx);
}
catch(e)
{
    console.log("CommonKeys is wrong")
}
try
{
    const third = {a: 2, b: {x: 7},c:5,k:7};
    const fourth = {};
    const commonKeysEx = lab2Objects.commonKeys();
    console.log("CommonKeys is unsuccessful and the result is "+ commonKeysEx);
}
catch(e)
{
    console.log("CommonKeys is wrong in a right way");
}
console.log("  ");
try
{
    const fourth = {a: 3, b: {x: 7, y: 10}, p:0};
    const flipObjectEx = lab2Objects.flipObject(fourth);
    console.log("FlipObjects is successful and the result is "+ flipObjectEx);
}
catch(e)
{
    console.log("FlipObjects is wrong");
}
try
{
    const fourth = {};
    const flipObjectEx = lab2Objects.flipObject(fourth);
    console.log("FlipObjects is unsuccessful and the result is "+ flipObjectEx);
}
catch(e)
{
    console.log("FlipObjects is wrong in a right way");
}
