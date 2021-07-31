if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
 } 

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Findpet = require('./models/findPet');
const axios = require('axios');
const key = process.env.PETFINDER_KEY;
const secret = process.env.PETFINDER_SECRET;
const accessToken = process.env.PETFINDER_ACCESS_TOKEN;
const bodyParser = require('body-parser');
const fetch = require('node-fetch');


mongoose.connect('mongodb://localhost:27017/myFurEverPal', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log('Database Connected!');
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('home')
});

//testing to see if works 
// app.get('/survey', async (req, res) => {
//     const survey = new Findpet({ name: 'Harry Potter', petType: 'dog' });
//     await survey.save();
//     res.send(survey);
// });



app.get('/index', async (req, res) => {
    try {
        const tokenRes = await fetch('https://api.petfinder.com/v2/oauth2/token', {
            method: 'POST',
            body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            //new
            json: true
        });

        const { access_token } = await tokenRes.json();

        const petType = await fetch(
            `https://api.petfinder.com/v2/animals`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        )
        const { animals } = await petType.json(); 
        const [ { id, url, type, age, gender, description } ] = animals;
        console.log({ id, url, type, age, gender, description }); //prints ONE object w/ one's pet's info --just prints these items though (no photo) 
        //console.log(animals[0]);
        //res.send({ animals }); //brings up the WHOLE entire OBJECT OF animals {animals:[{id: 123, url: etc}]}
        //res.send(animals);//this starts w/ the array and then has objects [{id: 123, url: etc.}]
        //res.send({ id, url, type, age, gender, description }); //brings up one pet's info only 
        res.send(animals[0]); //shows all the fields for one animal (all of the avail objects/info)
        
        
    } catch (error) {
        console.log(error);
    }
});



app.listen(3000, () => {
    console.log('Listening on port 3000!')
});