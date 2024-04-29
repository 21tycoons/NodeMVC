const app     = require('../../config/server')
const session = require('express-session')


app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}))

// Session-persisted message middleware

app.use(function(request, response, next) {
  var error   = request.session.error
  var message = request.session.success
  delete request.session.error
  delete request.session.success
  response.locals.message = ''
  if (error) response.locals.message = '<p class="msg error">' + error + '</p>'
  if (message) response.locals.message = '<p class="msg success">' + message + '</p>'
  next()
})
