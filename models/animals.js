const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for finding pet survey 
const AnimalSchema = new Schema ({
    name: String, //name of pet
    id: String,
    type: String,  //dog, cat, etc.
    age: String,
    contact: {
        address: {
            postcode: Number,
        }
    }, //where pet is located 
    description: String,
    url: String
    //images: [ImageSchema]
});


module.exports = mongoose.model('Animal', AnimalSchema);