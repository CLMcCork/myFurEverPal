if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
 } 

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Animals = require('./models/animals');
const axios = require('axios');
const key = process.env.PETFINDER_KEY;
const secret = process.env.PETFINDER_SECRET;
const accessToken = process.env.PETFINDER_ACCESS_TOKEN;
// const bodyParser = require('body-parser'); //this is deprecated...
const fetch = require('node-fetch');
const animals = require('./models/animals');



//vars for routes 
const indexRoutes = require('./routes/index');


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


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//below is used to fix CORS issue 
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*'); //*=wildcard, can change to specific domains 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); //can change to whichever ones i need 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// parse application/x-www-form-urlencoded //this would need <form> encoded data 
//app.use(bodyParser.urlencoded({ extended: false }))




//Routes
app.use('/index', indexRoutes);





app.get('/', (req, res) => {
    res.render('home')
});

//testing to see if works 
// app.get('/survey', async (req, res) => {
//     const survey = new Findpet({ name: 'Harry Potter', petType: 'dog' });
//     await survey.save();
//     res.send(survey);
// });


//KEEP 71-95
// app.get('/index', async (req, res) => {
//     try {
//         const tokenRes = await fetch('https://api.petfinder.com/v2/oauth2/token', {
//             method: 'POST',
//             body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         });

//         const { access_token } = await tokenRes.json();

       

//         const petType = await fetch(
//             `https://api.petfinder.com/v2/animals`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${access_token}`,
//                     //'Content-Type': 'application/x-www-form-urlencoded',
//                     //json: true
//                     'Content-Type': 'application/json'
//                 }
//             }
//         )

        


        //const { animals } = await petType.json(); 
        
        
        //KEEP below
        //const animal = await petType.json(); 
        //console.log(animals);
        
        
        //KEEP below 
        //const animals = JSON.stringify(animal);
        
        
        // const {animals} = (JSON.stringify(animal));
        

        //const [ { id, url, type, age, gender, description } ] = animals;
        //console.log({ id, url, type, age, gender, description }); //prints ONE object w/ one's pet's info --just prints these items though (no photo) 
        //console.log(animals[0]);
        //res.send({ animals }); //brings up the WHOLE entire OBJECT OF animals {animals:[{id: 123, url: etc}]}
        //res.send(animals);//this starts w/ the array and then has objects [{id: 123, url: etc.}]
        //res.send({ id, url, type, age, gender, description }); //brings up one pet's info only 
        //res.send(animals[0]); //shows all the fields for one animal (all of the avail objects/info)
        //res.render('pets/index', { animals }); //[object Object], [object Object],
        
        //console.log(animals.length)
        //console.log(animals.name)
        //console.log(animals)
        
        
        //KEEP below
        //console.log(animal.animals[0].id, animal.animals[0].url, animal.animals[0].type, animal.animals[0].age, animal.animals[0].gender, animal.animals[0].description)
       
        //^^this prints the id, url, etc for the first object in the array 
       //need to figure out how to get this to display in ejs 
        
       //res.render('pets/index', { animals: [{'id': id, url: url}] });
       
       
       //KEEP below 
       //res.render('pets/index', { animals });
         
        
        
        //res.render('pets/index', { animals: (res.body)});
        // const data = await petType.json();
        // const newAnimals = (res.body);
        //res.render('pets/index', { data, newAnimals });
         //console.log(res.body);
    
    
        //KEEP 148-1515
//     } catch (error) {
//         console.log(error);
//     }
// });







app.listen(3000, () => {
    console.log('Listening on port 3000!')
});