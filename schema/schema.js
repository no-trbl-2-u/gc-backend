// TODO: Modularize Schema

const graphQL = require('graphql')
const bcrypt = require('bcrypt')
const validateAccount = require('../utils/validateAccount')
const loginAuth = require('../utils/loginAuth')

// Models
const Account = require('../models/Account')

// GraphQL Types
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = graphQL

// Account Type
const AccountType = new GraphQLObjectType({
  name:'Account',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString }
  })
})

// Login Authorization
const AuthLogin = new GraphQLObjectType({
  name: 'AuthLogin',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    token: { type: GraphQLString }
  })
})

// Root
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Single Account
    account: {
      type: AccountType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Account.findById(args.id)
      }
    },

    // All Accounts
    accounts: {
      type: GraphQLList(AccountType),
      resolve(par, args) {
        return Account.find({})
      }
    },

    // Login
    accountLogin: {
      type: AuthLogin,
      args: {username: {type: GraphQLString }, password: {type: GraphQLString}},
      resolve(par, args) {
        return loginAuth(args.username, args.password)
          .then(token => ({
            username: args.username,
            token: token
          }))
          .catch(err => console.log("Error", err))
      }
    }
  }
})


// Mutation Procedure
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // ALL POSSIBLE MUTATIONS

    // Add Account
    addAccount: {
      type: AccountType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve(par, args) {
        // Generate hash async
        bcrypt.hash(args.password, 10, (err, hash) => {
          if(err) console.log("Error: ", err)

          // Create Account w/ hashed password
          let account = new Account({
            username: args.username,
            password: hash,
            email: args.email
          })

          // Validate Entry
          validateAccount(account)
            .then(ea => ea === true ? account.save() : console.log("Account Exists"))

          return true
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})