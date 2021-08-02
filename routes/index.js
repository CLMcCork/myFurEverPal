const express = require('express');
const router = express.Router(); 
//const axios = require('axios');
const key = process.env.PETFINDER_KEY;
const secret = process.env.PETFINDER_SECRET;
const accessToken = process.env.PETFINDER_ACCESS_TOKEN;
const fetch = require('node-fetch');
const Animals = require('../models/animals');


router.get('/index', async (req, res) => {
    try {
        const tokenRes = await fetch('https://api.petfinder.com/v2/oauth2/token', {
            method: 'POST',
            body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            //new
            //json: true
        });
  
        const { access_token } = await tokenRes.json();
  
      
  
        const petType = await fetch(
            `https://api.petfinder.com/v2/animals`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    //'Content-Type': 'application/x-www-form-urlencoded',
                    //json: true
                    'Content-Type': 'application/json'
                }
            }
        )
  
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            const data1 = JSON.stringify(data);
            const animals = new Animals({ data1 });
            //console.log(animals); //prints the _id: aldsflad;fj of one 
            // const pets = data1['id'];
            // console.log(pets)
            //const pets = JSON.stringify(data.animals);
            //console.log(data.animals[0]['id']); 
            // const animals = new Animals(pets);
            // console.log(animals);
            //const pets  = data.animals;
            //console.log(pets); 
            // console.log(pets['id']); 
            //console.log(pets[0]['id', 'type'])
            res.render('pets/index',  { animals } );
        });
  
        
  
        //const { animals } = await petType.json();
        //KEEP below
        //const animal = await petType.json();
        //console.log(animals);
        //KEEP below
        //const animals = JSON.stringify(animal);
        // const {animals} = (JSON.stringify(animal));
       
  
        
        //KEEP below
        //console.log(animal.animals[0].id, animal.animals[0].url, animal.animals[0].type, animal.animals[0].age, animal.animals[0].gender, animal.animals[0].description)
       //^^this prints the id, url, etc for the first object in the array
       //need to figure out how to get this to display in ejs
       
       //res.render('pets/index', { animals: [{'id': id, url: url}] });
       //KEEP below
       //res.render('pets/index', { animals });
        
       
       
       //console.log(req);
       //console.log(res.data);
        //res.render('pets/index', { animals: (res.body)});
        // const data = await petType.json();
        // const newAnimals = (res.body);
        //res.render('pets/index', { animal : animals });
         //console.log(res.body);
   
   
       
    } catch (error) {
        console.log(error);
    }
 });
  
  
 module.exports = router; 