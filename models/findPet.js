const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for finding pet survey 
const FindpetSchema = new Schema ({
    name: String, //name of pet
    petType: String,  //dog, cat, etc.
    age: Number,
    zip: Number, //where pet is located 
    description: String,
    //images: [ImageSchema]
});


module.exports = mongoose.model('Findpet', FindpetSchema);