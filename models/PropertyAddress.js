const mongoose = require('mongoose')

const PropertySchema = new mongoose.Schema({
    streetAdress: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
  })