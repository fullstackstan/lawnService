const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
  })