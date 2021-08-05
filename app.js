if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
 } 

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
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

app.engine('ejs', ejsMate);
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




//Routes
app.use('/', indexRoutes);
//app.use('/user', userRoutes); //need to make a user route and controller 
//app.use('/results', resultsRoutes) //also need to make a results route and controller 




app.get('/', (req, res) => {
    res.render('home')
});




app.listen(3000, () => {
    console.log('Listening on port 3000!')
});