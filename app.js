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

app.get('/pets', async (req, res) => {
    const pets = await Findpet.find({});
    res.render('pets/index', { pets }); 
})


//setting the headers to use the access token 
// const config = { 
//     headers: { 
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}` 
//     }
// };


//function to get all pets 
// const getPets = async () => {
//     const res = await axios.get('https://api.petfinder.com/v2/animals', config)
//     console.log(res.data);
//     //const { animals } = await res.json();
   
// }

//calling the getPets function 
// getPets();


//testing to see if can render the data for a specific id 






//app.get('/pets/:id', async (req, res) => {
//     //res.render('/');
// });







//app.get('/index', async(req, res) => {
// async function getPets() {
//     try {
//         const response = await axios.get(instance);
//         //return await axios.get(`curl -H Authorization: Bearer ${accessToken} 'https://api.petfinder.com/v2/animals'`)
//         console.log(response);
//         const data = await response.json();
//         console.log(data);
//         res.render(data);
//         //showPets(data.message);
//     } catch(error) {
//         console.error("Oh no! There was an error!", error);
//     }
// //});
// };

//getPets();


//calling function to initiate
//getPets();




// const showPets = async() => {
//     const pets = await getPets();
//     if (pets){
//         console.log(pets);
//         //(data);
//         console.log(message);
//         console.log(instance);
//     }
// }

// showPets();

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
        console.log({ id, url, type, age, gender, description }); //prints ONE object w/ one's pet's info 
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