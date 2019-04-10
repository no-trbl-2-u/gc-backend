const Account = require('../models/Account')

async function validateAccount({username, password, email}){
  const EMAILregEx = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
  const accountFind = await Account.findOne({username})
  const emailFind = await Account.findOne({email})

  if(!username) return false
  if(!password) return false

  // Matches hash length
  if(password.length !== 60) return false
  
  // Valid email
  if(email.search(EMAILregEx) === -1) return false

  // Username already exists?
  if(accountFind){
    if(accountFind._doc){
      if(accountFind._doc.username === username){
        return false
      }
    }
  }

  // Email already exists?
  if(emailFind){
    if(emailFind._doc){
      if(emailFind._doc.email === email){
        return false
      }
    }
  }

  return true
}

module.exports = validateAccount