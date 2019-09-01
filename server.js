const express = require('express');
const app = express();
const fetch = require('node-fetch');
var Datastore = require('nedb')

require('dotenv').config();

var mycheckin=new Datastore('database.db')
mycheckin.loadDatabase();

app.use(express.static('public'));

app.use(express.json({limit:'1mb'}))

app.listen(8080,()=>console.log('listening in port 8080'));
console.log(process.env);
app.get('/api/:latlong', (request,response)=>
{
    const latlong = request.params.latlong.split(','); 
    const lat=latlong[0];
    const long = latlong[1];
       console.log(lat,long);

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
       //add latlong to database
       var db={
        lat:lat,
        long:long,
        time:time,
        date:today,
    }
        mycheckin.insert(db,function(err,newDoc){});
        const api_key=process.env.API_KEY ;
        console.log(process.env.API_KEY);
       async function darksky()
    {
        const response_from_darksky = await fetch(`https://api.darksky.net/forecast/${api_key}/${lat},${long}?si`);
        const temp = await response_from_darksky.json();
        console.log(temp);
        
        const toclient=
           {
                temp:temp.currently.temperature ,
                timezone : temp.currently.timezone ,
                summary : temp.currently.summary,
                text : temp.hourly.summary,
           }
           console.log('check');
           response.json(toclient);
    }
    darksky();
})

app.get('/database',(request,response)=>
{
    mycheckin.find({},function(err,docs)
    {
        response.json(docs);
    })
})