const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email); // Add this line
    const user = await User.findOne({ where: { email } });
    console.log('User found:', user); // Add this line

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Add this line

    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
} catch (error) {
    console.error('Error during login:', error); // Add this line
    res.status(500).json({ error: 'Failed to login' });
}

};
