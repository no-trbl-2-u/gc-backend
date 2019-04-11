const Account = require('../models/Account')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function loginAuth(username, password){
  const account = await Account.findOne({username})
  const result = account
    ? bcrypt.compareSync(password, account._doc.password)
    : null

  let token = jwt.sign({info: "Payload"}, secret)

  result
    ? console.log("Authorized")
    : console.log("Rejected")

  return result
    ? token
    : null
}

module.exports = loginAuth