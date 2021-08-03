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
router.get('/pf', indexController.getPetFinder);

// GET /index/animals 
router.get('/animals', indexController.getAnimals);

//POST /index/animal 
router.post('/animal', indexController.postAnimals);



  
  
 module.exports = router; 