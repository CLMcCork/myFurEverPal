const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for finding pet survey 
const FindpetSchema = new Schema ({
    name: String, //should name and email just refer to the User when I set that up? 
    zip: Number,
    petType: String  
});


module.exports = mongoose.model('Findpet', FindpetSchema);