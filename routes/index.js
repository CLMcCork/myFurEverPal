const express = require('express');
const router = express.Router(); 
//const axios = require('axios');
const key = process.env.PETFINDER_KEY;
const secret = process.env.PETFINDER_SECRET;
const accessToken = process.env.PETFINDER_ACCESS_TOKEN;
const fetch = require('node-fetch');
const Animals = require('../models/animals');
const indexController = require('../controllers/index');

//get data from petfinder /index/pf 
router.get('/index', indexController.getPetFinder);

// GET /index/animals //testing 
router.get('/animals', indexController.getAnimals);

//POST /index/animal  //testing 
router.post('/animal', indexController.postAnimals);

// //testing
// router.get('/changecolor', indexController.changeColor);

//GETs the next pet when the arrow is clicked 
router.get('/getnextpet', indexController.getNextPet);

//sends the R click animal info to the View Matches show page 
//need to figure out the correct route for this...
//router.get('/swiperight', indexController.swipeRight);
router.get('/getnextpet', indexController.swipeRight);
// router.post('/getnextpet', indexController.swipeRight);

//post route to send the matches to the View Matches page? 
router.post('/viewmatches', indexController.viewMatches); 

//View the matches (user has swiped right on) 
router.get('/viewmatches', indexController.viewMatches);



//TESTING 
router.post('/submit-data', indexController.submitData);

  
  
 module.exports = router; 