const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Plan = require('../models/Plan');
const User = require('../models/User');
const Auth = require('../middleware/Auth');

// @route GET api/plans
// @ desc GET all plans
// access Private

// @route POST api/plans
// @desc  ADD new plan
// @access  Private

// @route PUT api/plans/:id
// @desc  Update plan
// access Private

// @route DELETE api/plan
// @desc  Delete plan
// access Private

module.exports = router;
