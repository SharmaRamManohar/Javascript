const button = document.querySelector('button')
button.addEventListener('click',()=>
{
    if(navigator.geolocation)
    {
       navigator.geolocation.getCurrentPosition(onSuccess,onError); 
    }
    else{
        button.innerText='your browser is not supported';
    }
})

function onSuccess(position)
{ 
    let {latitude,longtude}=position.coords;
//    console.log(latitude,longtude)
fetch (`http://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longtude}&key=${apiKey}`)
.then(response => response.json()).then(result =>
    {
        let alldetails=result.result[0].components;
        let {county,postcode ,country}=alldetails;
        button.innerText=`${county} ${postcode} ,${country}`
    })
}

function onError(error)
{
   if(error.code ==1)
   {
    button.innerText='you denied the request'
   }
   else if(error.code==2)
   {
    button.innerText='location not available'
   }
   else{
    button.innerText='something went wrong'
   }
}