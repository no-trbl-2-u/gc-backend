const Account = require('./models/Account')

async function validateAccount({username, password, email}){
  const EMAILregEx = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
  const accountFind = Account.findOne({username: username},
    (err, doc) => {
      if(err) throw err
      if(doc){
        if(doc._doc.username){
          return false
        }else{
          return true
        }
      }
  })

    // TODO: Almost there...
  let results = await accountFind
  // console.log("res", results._doc.username)
  /*
    { _id: 5ca9aa200e0b631d9423f5a5,
  username: 'admin',
  password:
    '-',
  email: 'admin@gmail.com',
  __v: 0 }
  */ 
  if(!username) return false
  if(!password) return false
  if(password.length !== 60) return false
  if(email.search(EMAILregEx) === -1) return false

  // Throws error if undefined....duh!
  // if(results._doc.username) {console.log("Found")}else{console.log("None")}



}

module.exports = validateAccount