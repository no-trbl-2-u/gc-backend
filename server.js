// server.js
const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

// Configuration
const schema = require('./schema/schema')
const PORT = process.env.PORT || 4000

// Dev vs. Prod Environment
const DBURL = process.argv[2] === "production"
  ? process.env.DATABASE_URL
  : require('./.env')

// console.log(DBURL)

// Instantiate App
const app = express()

// Database Connection
mongoose.connect(DBURL, { useNewUrlParser: true })
  .catch(err => console.log(err))
const db = mongoose.connection

// onLoad
db.once('open', () => {
  console.log('Now connected to Database.')
})


// #################################
// TEMPORARY VIEW STUFF
app.set('view engine', 'ejs')

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'))

// TMP route -> '/'
app.get('/', (req, res) => res.render('index'))
// #################################


// Cross-Origin Resource Sharing
app.use(cors())

// route -> '/gql'
app.use('/gql', graphqlHTTP({
  schema,
  graphiql: process.argv[2] === 'develop' ? true : false
}))

// Listening on...
app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`))

