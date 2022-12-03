// IMPORT DEPENDENCIES
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const Animal = require('./models/animal')
const PORT = process.env.PORT
const app = express()
const AnimalRouter = require('./controllers/animalController')




//-----------------
// Middleware
//-----------------
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


app.use(AnimalRouter)







// Listening Route
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT}`)
})