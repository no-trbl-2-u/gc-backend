const graphQL = require('graphql')

// TMP DATA #############
// const mockData = require('../mockData/dataIndex')
// ######################

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
    password: { type: GraphQLString }
  })
})

// Root
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // ALL POSSIBLE QUERIES ###########################

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

// TODO: Mutation Procedure
// Mutation Procedure
// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     // ALL POSSIBLE MUTATIONS ########
//     // Add Account
//     addAccount: {
//       type: AccountType,
//       args: {
//         username: {type: GraphQLString},
//         password: {type: GraphQLString}
//       },
//       resolve(par, args) {
        
//       }
//     }
//   }
// })

module.exports = new GraphQLSchema({
  query: RootQuery
})