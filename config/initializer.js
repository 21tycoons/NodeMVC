const app  = require('./server')
const path = require('path')


const mustacheExpress = require('mustache-express')
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../app/views'))
