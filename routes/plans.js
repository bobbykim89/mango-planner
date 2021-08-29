const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Plan = require('../models/Plan');
const User = require('../models/User');
const Auth = require('../middleware/Auth');

// @route GET api/plans
// @ desc GET all plans
// access Private
router.get('/', Auth, async (req, res) => {
  try {
    const plans = await Plan.find({ author: req.user.id });
    res.json(plans);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/plans
// @desc  ADD new plan
// @access  Private
router.post(
  '/',
  [Auth, [check('title', 'title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, content, complete, type } = req.body;

    try {
      const newPlan = new Plan({
        title,
        content,
        complete,
        type,
        author: req.user.id,
      });
      const plan = await newPlan.save();
      res.json(plan);
    } catch (err) {
      console.err(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT api/plans/:id
// @desc  Update plan
// access Private
router.put(
  '/:id',
  [
    Auth,
    [
      check('content', 'Please write some content')
        .not()
        .isEmpty()
        .trim()
        .escape(),
    ],
  ],
  async (req, res) => {
    const { id } = req.user;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let plan = await Plan.findById(req.params.id);
      if (!plan) {
        return res.status(404).json({ msg: 'Plan not found :(' });
      }
      // Making sure user is authorized
      if (plan.author.toString() !== id) {
        return res.status(401).json({ msg: 'Not Authorized' });
      }
      plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(plan);
      console.log(req.params);
      console.log(req.body);
    } catch (err) {
      console.err(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/plan
// @desc  Delete plan
// access Private
router.delete('/:id', Auth, async (req, res) => {
  try {
    let plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ msg: 'Plan not found :(' });
    }
    // Making sure user is authorized
    if (plan.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
    await Plan.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Posting has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
