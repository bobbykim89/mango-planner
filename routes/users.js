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

// @route   POST api/users
// @ desc   Register a user
// access   Public
router.post(
  '/',
  [
    check('name', 'Please add Username').not().isEmpty(),
    check('email', 'Please include a valid email address')
      .isEmail()
      .normalizeEmail(),
    check(
      'password',
      'Password must be greater than 8 characters and contain numbers, lowercase letters and uppercase letters'
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, darkMode } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          msg: 'Following email address is already in use, Please use different Email',
        });
      }
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
          darkMode: user.darkMode,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/users/:id
// @ desc   Update user info (darkmode pref)
// access   Private
router.put('/:id', Auth, async (req, res) => {
  const { id } = req.user;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User does not exist :(' });
    }
    // Making sure user is authorized
    if (user.id.toString() !== id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
    user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(user);
    console.log(req.params);
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
