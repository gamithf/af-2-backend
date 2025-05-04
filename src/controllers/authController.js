const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');
const logger = require('../utils/logger');


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const register = async (req, res, next) => {
  try {
    
    const { name, email, password, role } = req.body;

    // check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const user = await new User({
      name,
      email,
      password,
      role: role || 'user',
    }).save();

    res.status(201).json({ 
      token: generateToken(user) ,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error); 
  }
};

const login = async (req, res, next) => {
  try {
    // validation
    await check('email', 'Please include a valid email').isEmail().run(req);
    await check('password', 'Password is required').exists().run(req);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email.' });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({ 
      token: generateToken(user) ,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
