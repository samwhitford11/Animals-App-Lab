const express = require('express')
const Animal = require('../models/animal')

//Create Router varaible to attach routes
const router = express.Router()


//-----------------
// Routes
//-----------------

router.get('/', (req,res) => {
    res.send("your server is running... better catch it.")
});



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
});

// Create Route / POST
router.post("/animals", (req, res) => {
    req.body.extinct = req.body.extinct === 'on' ? true: false;
    Animal.create(req.body, (err, createdAnimal) => {
        console.log('created', createdAnimal, err)
        res.redirect("/animals")
    });
});

// Edit Route
router.get('/animals/:id/edit', (req, res) => {
    const id = req.params.id
    // Find the animal and send it to the edit.ejs  to prepopulate the form
    Animal.findById(id, (err, foundAnimal) => {
        // res.json(foundAnimal)
        res.render('animals/edit.ejs', { animal: foundAnimal })
    });
});

router.put('/animals/:id', (req, res) => {
    
    req.body.extinct = req.body.extinct === 'on' ? true : false

    Animal.findByIdAndUpdate(req.params.id, req.body, 
        {new: true},(err, updateAnimal) => {
        console.log(updateAnimal)

        res.redirect(`/animals/${req.params.id}`)
        
    });
});

// Delete Route
router.delete('/animals/:id', async (req, res) => {
    Animal.findByIdAndDelete(req.params.id, (err, deletedAnimal) => {
        console.log(err, deletedAnimal)
        res.redirect('/animals')
    });

});


// Show Route
router.get('/animals/:id', (req, res) => {
    const id = req.params.id

    Animal.findById(id, (err, animal) => {
        res.render('animals/show.ejs', {animal})
    });
});

module.exports = router
