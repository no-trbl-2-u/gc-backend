const graphQL = require('graphql')
const bcrypt = require('bcrypt')

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

// TODO: Update Account Type w/ more parameters
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

// Root
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // ALL POSSIBLE QUERIES
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
          console.log(err)
          // Create Account w/ hashed password
          let account = new Account({
            username: args.username,
            password: hash,
            email: args.email
          })

          // Commit to database
          console.log(account)
          return 0
          // return account.save()
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})