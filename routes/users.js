if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @ desc   Register a user
// access   Public

module.exports = router;
