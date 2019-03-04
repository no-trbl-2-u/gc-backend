const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
  username: String,
  password: String,
})

module.exports = mongoose.model('Account', accountSchema)
