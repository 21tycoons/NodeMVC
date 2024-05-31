const app    = require('../../config/server')
const logger = require('morgan')

app.use( logger('tiny') )