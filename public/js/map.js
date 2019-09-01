 
    async function getall()
    {
        const response= await fetch('/database');
        const data = await response.json();
        
     //console.log(data);
        var mymap = L.map('mapid').setView([0, 0], 4);
   
    L.tileLayer(' https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(mymap);
    
    
    for(let i=0;i<data.length;i++)
        {
        var marker = L.marker([data[i].lat,data[i].long]).addTo(mymap);
   // console.log(data);
    
    marker.bindPopup(`I was here on ${data[i].date} at ${data[i].time}`).openPopup();
        }
       
    }
 getall();

 document.querySelector('.back').addEventListener('click',()=>
 {
     window.location='index.html';
 })