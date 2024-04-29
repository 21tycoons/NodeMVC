const app  = require('./server')
const path = require('path')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../app/views'))
