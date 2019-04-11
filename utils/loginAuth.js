const Account = require('../models/Account')
const bcrypt = require('bcrypt')
const jwt = require('express-jwt')

async function loginAuth(username, password){
  const account = await Account.findOne({username})
  const result = account
    ? bcrypt.compareSync(password, account._doc.password)
    : null

  let testToken = jwt({
    secret: "Shhhh, this is a secret!",
    issuer: "/gql-schema"
  })


  // console.log("JWT", testToken(req, res) => )

  result
    ? console.log("Authorized")
    : console.log("Rejected")

  return result
}

module.exports = loginAuth