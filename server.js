const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

// TEMP DATA ######################
// const data = require('./mockData/dataIndex')
// ################################

// Configuration
const schema = require('./schema/schema')
const LOCAL_DBURL = require('./.env')
const PORT = process.env.PORT || 4000
const DBURL = process.env.DATABASE_URL || LOCAL_DBURL

console.log(DBURL)

// Instantiate App
const app = express()

// TODO: DEBUG Mongoose Connection
// TODO: .env for local, process.env for Prod/heroku
// Database Connection
// mongoose.connect(DBURL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.once('open', () => {
//   console.log('Now connected to Database.')
// })


// #################################
// TEMPORARY VIEW STUFF
app.set('view engine', 'ejs')

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'))

// TMP route -> '/'
app.get('/', (req, res) => res.render('index'))

// TMP route -> '/api/accounts'
// app.get('/api/accounts', (req, res) => res.send(data))
// #################################


// route -> '/'
// app.get('/',(req, res) => res.send('Hello World'))

// route -> '/gql'
app.use('/gql', graphqlHTTP({
  schema,
  graphiql: true
}))

// Listening on...
app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`))