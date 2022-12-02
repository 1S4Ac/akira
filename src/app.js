const express = require('express')
const tableRoutes = require('./routes/table')
const app = express()

app.use('/table', tableRoutes)

module.exports = app