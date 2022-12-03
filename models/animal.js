//-------------------
// Models
//-------------------
const mongoose = require('./connections')

const {Schema, model} = mongoose

//Animals Schema
const animalsSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
});

// Make animal model
const Animal = model("Animal", animalsSchema)

module.exports = Animal
