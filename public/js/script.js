let data;
navigator.geolocation.getCurrentPosition((position)=>
{
    const lat=position.coords.latitude;
    const long =position.coords.longitude;
    console.log({ lat , long});
    //  data={
    //     method:'POST',
    //     headers:{
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({lat,long}),

    // };

    async function server()
    {
    const response = await fetch(`/api/${lat},${long}`);
    const t = await response.json();
    console.log(t);

    document.querySelector('.text').textContent= t.temp +'°C ' +t.summary + ' ' + t.text; 
    }

 server();

})

document.querySelector('.checkin').addEventListener('click',()=>
{
    
 window.location='map.html';
   
})

