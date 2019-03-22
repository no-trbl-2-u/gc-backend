const mongoose = require('mongoose')
const Schema = mongoose.Schema


// TODO: Update Account Type with more parameters
const accountSchema = new Schema({
  username: String,
  password: String,
  email: String
})

module.exports = mongoose.model('Account', accountSchema)
