const express = require('express')


// TEMP DATA ######################
const data = require('./mockData/dataIndex')
// ################################

// Configure App
const PORT = process.env.PORT || 4000

// Instantiate App
const app = express()

// #################################

// TEMPORARY VIEW STUFF
app.set('view engine', 'ejs')

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'))

// TMP route -> '/'
app.get('/', (req, res) => res.render('index'))

// TMP route -> '/api/accounts'
app.get('/api/accounts', (req, res) => res.send(data))

// #################################



// route -> '/'
// app.get('/',(req, res) => res.send('Hello World'))

// Listening on...
app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`))