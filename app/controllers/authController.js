const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(404).json({ error: 'Invalid username or password' });
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ error: 'Invalid username or password' });
  
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret_key', {
        expiresIn: '1h',
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in', details: error.message });
    }
  };
  

module.exports = { login };
