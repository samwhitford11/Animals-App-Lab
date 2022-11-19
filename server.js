// IMPORT DEPENDENCIES
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")

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
const {Schema, models} = mongoose

//Animals Schema
const animalsSchema = new Schema({
    species: String,
    Extinct: Boolean,
    Location: String,
    lifeExpectancy: Number
})

// Make animal model
const Animal = model("Animal", animalsSchema)