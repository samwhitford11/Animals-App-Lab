
// DATABASE CONNECTION
require("dotenv").config() // load env variables
const mongoose = require('mongoose')// gives us that database connection and cool methods for CRUD to the datas

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

//export mongoose with connection to use in other files
module.exports = mongoose