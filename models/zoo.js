
require('dotenv').config()
const mongoose = require('./connections')
const Animal = require('./animal')



mongoose.connection.on('open', () => {
    const startAnimals = [
        {species: "Stickleback", extinct:false, location: "Asia", lifeExpectancy: 1},
        {species: "Wallaby", extinct:false, location: "Australia", lifeExpectancy: 15},
        {species: "Bushbaby", extinct:false, location: "Africa", lifeExpectancy: 16},
        {species: "Gibbon", extinct:false, location: "Asia", lifeExpectancy: 35},
        {species: "Megabat", extinct:false, location: "Africa", lifeExpectancy: 30},
    ]
    Animal.deleteMany({}, (err, data) => {
        Animal.create(startAnimals, (err, data) => {
            res.json(data);
        }
      );
    });
});