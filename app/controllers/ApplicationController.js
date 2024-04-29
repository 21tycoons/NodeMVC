const app  = require('../../config/server')
const hash = require('pbkdf2-password')()


app.get('/', function(request, response) {
  response.redirect('/login')
})

app.get('/restricted', restrict, function(request, response) {
  response.send('Wahoo! restricted area, click to <a href="/logout">logout</a>')
})

app.get('/logout', function(request, response) {
  request.session.destroy(() => {
    response.redirect('/')
  })
})

app.get('/login', function(request, response) {
  response.render('login')
})

app.post('/login', function (req, res, next) {
  authenticate(req.body.username, req.body.password, function(err, user){
    if (err) return next(err)
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user
        req.session.success = " You're in, " + user.name + "! " + "Authenticated as " + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.'
        res.redirect('back')
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
      res.redirect('/login')
    }
  })
})


// Private


function restrict(request, response, next) {
  if (request.session.user) {
    next();
  } else {
    request.session.error = 'Access denied!';
    response.redirect('/login')
  }
}

// dummy database

var users = {
  Liroy: { name: 'Liroy' },
  Wendy: { name: 'Wendy' }
}

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

const PASSWORD = 'admin'
hash({ password: PASSWORD }, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  users.Liroy.salt = salt
  users.Liroy.hash = hash
})


// Authenticate using our plain-object database of doom!

function authenticate(name, pass, fn) {
  console.log('Authenticating %s', name, '...')
  var user = users[name];
  // query the db for the given username
  if (!user) return fn(null, null)
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err)

    if (hash === user.hash) {
      console.log('Authenticated %s', name, '!')
      return fn(null, user)
    }

    fn(null, null)
  })
}
