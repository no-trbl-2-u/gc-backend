const graphQL = require('graphql')

// TMP DATA #############
const mockData = require('../mockData/dataIndex')
// ######################

// TODO: Import Mongoose Models

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
    // ALL POSSIBLE QUERIES

    // Single Account
    account: {
      type: AccountType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return mockData.find(account => account.id === args.id)
      }
    },

    // All Accounts
    accounts: {
      type: GraphQLList(AccountType),
      resolve(par, args) {
        return mockData
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})