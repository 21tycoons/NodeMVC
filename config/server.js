'use strict'

/**
 * Module dependencies.
 */

var express = require('../../..')
const app = module.exports = express()

// Config

require('./initializer')

// Middleware

require('../app/middleware/logger')
require('../app/middleware/urlencoded')
require('../app/middleware/session')

// Controllers

require('../app/controllers/ApplicationController')

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3100)
  console.log('Express started on port 3100')
}
