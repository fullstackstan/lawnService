const mongoose = require('mongoose')

const GoogleUserSchema = new mongoose.Schema({
    googleId: String,
    googleEmail: { type: String, unique: true },
    googleUserName: String

  })

  module.exports = mongoose.model('GoogleUser', GoogleUserSchema)