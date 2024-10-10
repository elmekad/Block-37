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
    console.log('Login attempt for:', email); 
    const user = await User.findOne({ where: { email } });
    console.log('User found:', user); 

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); 

    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
} catch (error) {
    console.error('Error during login:', error); 
    res.status(500).json({ error: 'Failed to login' });
}

};


exports.verifyRole = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role; // Assuming role is included in the payload
    res.status(200).json({ role: userRole });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
