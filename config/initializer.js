const app  = require('./server')
const path = require('path')

const mustacheExpress = require('mustache-express')
const pug = require('pug')
app.engine('mustache', mustacheExpress())
app.engine('pug', pug.__express)

const VIEW_ENGINES = { EJS: 'ejs', Mustache: 'mustache', PUG: 'pug' }
app.set('view engine', VIEW_ENGINES.EJS)
app.set('views', path.join(__dirname, '../app/views'))
