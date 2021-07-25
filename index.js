if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
 } 

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Findpet = require('./models/findPet');
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





app.listen(3000, () => {
    console.log('Listening on port 3000!')
});