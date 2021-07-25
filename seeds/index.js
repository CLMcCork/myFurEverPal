const mongoose = require('mongoose');
//const pets = require('./pets');
const { animalName, animalType } = require('./pets')
const Findpet = require('../models/findPet');


mongoose.connect('mongodb://localhost:27017/myFurEverPal', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
   console.log("Database connected!");
});

//????
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Findpet.deleteMany({});
    for(let i = 0; i < 30; i++) {
        //const random = Math.floor(Math.random() * 100);
        const pet = new Findpet({
            //name: `${pets.name},`
            name: `${sample(animalName)}`,
            petType: `${sample(animalType)}`,
        });
        await pet.save();
    }
}


seedDB();

seedDB().then(() => {
    mongoose.connection.close();
 });