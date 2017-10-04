const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const Snippet = require('../models/snippet');
const config = require('../config/main');

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  });
}

// Set user info from request
function setUserInfo(req) {
  return {
    _id: req._id,
    name: req.name,
    email: req.email
  };
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
}

//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password,
        name: 'Junior Sniplet'
      });

      user.save(function(err, user) {
        if (err) { return next(err); }

        // Respond with JWT if user was created
        let userInfo = setUserInfo(user);

        res.status(201).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      });
  });
}

//========================================
// Delete Route
//========================================

exports.delete = (req, res, next) => {
  // let userInfo = setUserInfo(req.user);
  // console.log('req.user: ', req.user);
  // if (req.user._id === req.params.id) {
    User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).send({
        status: 'success',
        data: 'User successfully deleted'
      });
    })
    .catch(err => {
      res.status(404).send({
        status: 'fail',
        data: 'No user deleted'
      });
    })
  // } else {
  //   res.status(400).send('Bad kitty');
  // }
}
