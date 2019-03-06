// server.js
const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

// Configuration
const schema = require('./schema/schema')
const PORT = process.env.PORT || 4000
const DBURL = process.env.DATABASE_URL || require('./.env')

// Instantiate App
const app = express()

// Database Connection
mongoose.connect(DBURL, { useNewUrlParser: true })
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
  graphiql: true
}))

// Listening on...
app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`))