if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Auth = require('../middleware/Auth');

// @route   GET api/auth
// @desc    Get logged in user
// access   private
// Get Logged in user

// @route   POST api/auth
// @desc    Auth user & get token
// access   Public
// Login User

module.exports = router;
