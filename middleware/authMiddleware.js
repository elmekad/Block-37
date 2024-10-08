const express = require('express');
const authenticateJWT = require('./middleware/auth');
// const userRoutes = require('./routes/');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

// Protect routes with JWT middleware
app.use('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'Protected route accessed' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
