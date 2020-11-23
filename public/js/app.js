// console.log("hello from public js");

// fetch("http://puzzle.mead.io/puzzle").then((data)=>{
    
//         console.log(data);
// })


const weatherForm = document.querySelector("form");
const searchValue= document.querySelector("input");
const message1= document.querySelector("#message-1");
const message2= document.querySelector("#message-2");


//event listener
weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    const location = searchValue.value;
    message1.textContent="Loading forecast";
    // fetch api
    fetch("http://localhost:3000/weather?address="+encodeURIComponent(location)).then((res)=>{
    res.json().then(data=>{
        if(data.error){
            message1.textContent="Error";
            message2.textContent=data.error;
        }else{
            message1.textContent= "Your searched Address: "+data.Address;
            message2.textContent="The temperature in "+data.Location+" is "+data.Tempreture
        }
        
    })
})

})