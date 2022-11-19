// IMPORT DEPENDENCIES
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")

const PORT = process.env.PORT
const app = express()

// DATABASE CONNECTION
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
// Establishing connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for connection status
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))

//-------------------
// Models
//-------------------
const {Schema, model} = mongoose

//Animals Schema
const animalsSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

// Make animal model
const Animal = model("Animal", animalsSchema)

//-----------------
// Middleware
//-----------------
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


//-----------------
// Routes
//-----------------

app.get('/', (req,res) => {
    res.send("your server is running... better catch it.")
})

app.get('/animals/details', (req,res) => {
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

// .then method for index route
app.get('/animals', (req,res)=> {
    Animal.find({})
    .then((animals) => {
        res.render("animals/index.ejs", {animals});
    });
});

//New Route
app.get('/animals/new', (req,res) => {
    res.render("animals/new.ejs")
})

// Create Route / POST
app.post("/animals", (req, res) => {
    req.body.extinct = req.body.extinct === 'on' ? true: false;
    Animal.create(req.body, (err, createdAnimal) => {
        console.log('created', createdAnimal, err)
        res.redirect("/animals")
    });
});

// Show Route
app.get('/animals/:id', (req, res) => {
    const id = req.params.id

    Animal.findById(id, (err, animal) => {
        res.render('animals/show.ejs', {animal})
    });
});





// Listening Route
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT}`)
})