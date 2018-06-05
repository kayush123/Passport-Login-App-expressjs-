var express = require('express');
var router = express.Router();
const User = require('../models/user')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//Home Page
router.get('/', ensureAuthenticated, (req, res, next) => {
  res.render('index');
});

//login form
router.get('/login', (req, res, next) => {
  res.render('login');
});

//Register Form
router.get('/register', (req, res, next) => {
	res.render('register');
});

//Logout
router.get('/logout', (req, res, next) => {
  req.logout();
	req.flash('success_msg', 'You are logged out.');
  res.render('login');
});
router.get('/register', (req, res, next) => {
  res.render('register');
});
//process Register
router.post('/register', (req, res, next) => {
	console.log(req.body);
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  //Validations
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email must be a valid email address').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Name field is required').notEmpty();
  req.checkBody('password2', 'Password do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
	  res.render('register', {
		  errors: errors
	  });
  } else {
	  const newUser = new User({
	  	name: name,
	  	username: username,
	  	email: email,
	  	password: password
	  });

	  User.registerUser(newUser, (err,user) => {
	  	if(err) throw err;
	  	req.flash('success_msg', 'You are registered and can login.');
	  	res.redirect('/login');
	  });
  }
});

//Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
  User.getUserByUsername(username, (err, user) => {
  	if(err) throw err;
  	if(!user){
  		return done(null, false, {message: 'No user found'});
  	}
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
  		  return done(null, user);
  	  } else {
  		  return done(null, false, {message: 'Wrong Password'});
  	  }
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

//Login Processing
router.post('/login', (req, res, next) =>{
  passport.authenticate('local', {
  	successRedirect: '/',
  	failureRedirect:'/login',
  	failureFlash: true
  })(req,res,next);
});

//Access Control
function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg', 'You are not authorized to view that page');
		res.redirect('/login');
	}
}

module.exports = router;
