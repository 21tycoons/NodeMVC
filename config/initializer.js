const app  = require('./server')
const path = require('path')


const mustacheExpress = require('mustache-express')
const pug = require('pug')
app.engine('mustache', mustacheExpress())
app.engine('pug', pug.__express)
// app.set('view engine', 'mustache')
// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../app/views'))
