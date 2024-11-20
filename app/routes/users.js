const express = require('express');
const router = express.Router();

// Create a new user
router.post('/', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Simulate user creation logic (e.g., database insertion)
  res.status(201).json({ message: 'User created successfully' });
});

// Export the router
module.exports = router;
