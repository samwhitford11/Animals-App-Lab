const express = require('express')
const Animal = require('../models/animal')

//Create Router varaible to attach routes
const router = express.Router()


//-----------------
// Routes
//-----------------

router.get('/', (req,res) => {
    res.send("your server is running... better catch it.")
})



// .then method for index route
router.get('/animals', (req,res)=> {
    Animal.find({})
    .then((animals) => {
        res.render("animals/index.ejs", {animals});
    });
});

//New Route
router.get('/animals/new', (req,res) => {
    res.render("animals/new.ejs")
})

// Create Route / POST
router.post("/animals", (req, res) => {
    req.body.extinct = req.body.extinct === 'on' ? true: false;
    Animal.create(req.body, (err, createdAnimal) => {
        console.log('created', createdAnimal, err)
        res.redirect("/animals")
    });
});

// Edit Route

// Show Route
router.get('/animals/:id', (req, res) => {
    const id = req.params.id

    Animal.findById(id, (err, animal) => {
        res.render('animals/show.ejs', {animal})
    });
});

module.exports = router
