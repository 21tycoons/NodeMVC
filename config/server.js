'use strict'

/**
 * Module dependencies.
 */

const express = require('express')
const app     = module.exports = express()

// Config

require('./initializer')

// Middleware

require('../app/middleware/logger')
require('../app/middleware/urlencoded')
require('../app/middleware/session')

// Controllers

require('../app/controllers/application_controller')

// Models

const PORT = process.env.PORT || 3100

/* istanbul ignore next */
if ( !module.parent ) {
  app.listen( PORT )
  console.log( 'Express started on port ' + PORT )
}
