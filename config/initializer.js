const app  = require('./server')
const path = require('path')


const mustacheExpress = require('mustache-express')
const pug = require('pug')
app.engine('mustache', mustacheExpress())
app.engine('pug', pug.__express)


const VIEW_ENGINE = 'ejs'
app.set('view engine', VIEW_ENGINE)
app.set('views', path.join(__dirname, '../app/views'))
