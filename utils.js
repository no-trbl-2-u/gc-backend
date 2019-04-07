const Account = require('./models/Account')

function validateAccount({username, password, email}, db){
  const EMAILregEx = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
  // TODO: Figure out how to check DB w/ mongoose
  const accountFind = Account.find({ username })

  // console.log("Account", username)
  // console.log("Password", password)
  // console.log("email", email)

  if(!username) return false
  if(!password) return false
  if(password.length !== 60) return false
  if(email.search(EMAILregEx) === -1) return false

  return true
}

module.exports = validateAccount

// TODO: Optimize w/ Account.findByID instead of pulling ALL accounts...