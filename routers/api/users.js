const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const auth = require('../../utils/auth');
const upload = require('../../utils/upload');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route    POST api/users/register
// @desc     Register user
// @access   Public
router.post(
  '/register',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is requires')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 7 or more characters'
    ).isLength({ min: 7 }),
    check('password', 'password cannot contains the word "password"')
      .isLowercase()
      .not()
      .contains('password')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email already exists' }] });
      }

      user = new User({ name, email, password });

      // hashing the password will be done automatically in the User model before save()
      await user.save();

      const token = await user.generateAuthToken();

      res.json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(400).send({ msg: err.message });
    }
  }
);

// @route    GET api/users/auth
// @desc     Test route - to authenticate the user every time before any func
// @access   Private
router.get('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/users/login
// @desc     Login user
// @access   Public
router.post(
  '/login',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();

      res.json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(400).send({ msg: err.message });
    }
  }
);

// @route    GET api/users/allUsers
// @desc     get all users list except current user
// @access   Private
router.get('/allUsers', auth, async (req, res) => {
  try {
    // find all users with different id
    const allUsers = await User.find({ _id: { $ne: req.user.id } });
    res.json({ users: allUsers });
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ msg: err.message });
  }
});

// @route    POST api/users/logout
// @desc     Logout - Single session
// @access   Private
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.json({ msg: 'User logged out from current session' });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    POST api/users/logoutAll
// @desc     Logout - All sessions
// @access   Private
router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json({ msg: 'User logged out from all sessions' });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    DELETE api/users/me
// @desc     Delete user
// @access   Private
router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    POST api/users/avatar/me
// @desc     Add/Edit profile avatar
// @access   Private
router.post(
  '/avatar/me',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const user = await User.findById(req.user.id);

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 150, height: 150 })
      .png()
      .toBuffer();

    user.avatar = buffer;

    await user.save();

    res.json(user);
  },
  (error, req, res, next) => {
    // function designed to handle errors instead of the middleware
    res.status(400).send({ error: error.message });
  }
);

// @route    GET api/users/avatar/:id
// @desc     Get profile avatar
// @access   Public
router.get('/avatar/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error('User not found or no avatar');
    }

    res.set('Content-Type', 'image/jpg');
    res.send(user.avatar);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
