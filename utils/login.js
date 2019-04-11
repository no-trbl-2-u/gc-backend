const Account = require('../models/Account')
const bcrypt = require('bcrypt')

async function accountLogin(user, password){
  let tmp = await Account.findOne({username: user})
  let result = bcrypt.compareSync(password, tmp._doc.password)

  // TODO: if(results === true){Send JWT!}

  return result
}

module.exports = accountLogin