const AuthenticationController = require('./controllers/authentication');
const express = require('express');
const passportService = require('./config/passport');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const router = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Testing
  apiRoutes.get('/', () => res.send('Hello from apiRoutes!'));
  authRoutes.get('/', () => res.send('Hello from authRoutes!'));
  router.get('/', () => res.send('Hello from router!'))


  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

// Set url for API group routes
  app.use('/api', apiRoutes);
};
