const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// SIGN UP ROUTE
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate request
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 2. Check if user already exists (Database operation placeholder)
    // Example: const existingUser = await db.findUserByEmail(email);
    // if (existingUser) {
    //   return res.status(400).json({ error: 'Email is already registered' });
    // }

    // 3. Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user (Database operation placeholder)
    // Example: const newUser = await db.createUser({ name, email, password: hashedPassword });
    // const userId = newUser.id;

    // For boilerplate purposes, generating a mock user ID
    const mockUserId = '12345';

    // 5. Generate JWT
    const token = jwt.sign(
      { userId: mockUserId },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: mockUserId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// SIGN IN ROUTE
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate request
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // 2. Check if user exists (Database operation placeholder)
    // Example: const user = await db.findUserByEmail(email);
    // if (!user) {
    //   return res.status(400).json({ error: 'Invalid email or password' });
    // }

    // 3. Compare passwords
    // Example: const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ error: 'Invalid email or password' });
    // }
    
    // For boilerplate purposes, generating a mock user ID
    const mockUserId = '12345';
    const mockUserName = 'Mock User';

    // 4. Generate JWT
    const token = jwt.sign(
      { userId: mockUserId },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: mockUserId,
        name: mockUserName,
        email,
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Server error during signin' });
  }
});

module.exports = router;
