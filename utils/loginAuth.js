const Account = require('../models/Account')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET || require('../.env').SECRET

async function loginAuth(username, password){
  const account = await Account.findOne({username})
  const result = account
    ? bcrypt.compareSync(password, account._doc.password)
    : null

  let token = jwt.sign({
    user: username
  }, SECRET)

  result
    ? console.log("Authorized")
    : console.log("Rejected")

  console.log(SECRET)
  
  return result
    ? token
    : null
}

module.exports = loginAuth