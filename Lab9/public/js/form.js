let list = document.getElementById('attempts');
let inputText = document.getElementById('inputText');
let myForm = document.getElementById('myForm');
myForm.addEventListener('submit', (event) => {
        event.preventDefault();
    if(!inputText.value)
    {
        alert("There is no value in the input text")
        return;
    }
    if(inputText.value.trim().length<2)
    {
        alert("There is only spaces in the text or a letter.");
        return;
    }
    let inputVal  = inputText.value;
    if(typeof inputVal != "string")
    {
        alert("String was not given");
        return;
    }
    inputVal  = inputVal.toLowerCase();
    inputVal= inputVal.split(" ").join("");
    let range = inputVal.length
    let finalRes = inputVal;
    for(const i of inputVal)
    {
        let p = i.charCodeAt(0);
        if (!(p>=97&&p<=122)&&!(p>=48&&p <=57))
        {
            inputVal = inputVal.split(i).join("");
        }
    }
    console.log(inputVal);
    if(inputVal===inputVal.split("").reverse().join(""))
    {
        let li = document.createElement('li');
        li.innerHTML = inputText.value;
        li.className = "is-palindrome";
        list.appendChild(li);
    }
    else
    {
        let li = document.createElement('li');
        li.innerHTML = inputText.value;
        li.className = "not-palindrome";
        list.appendChild(li);
    }

});