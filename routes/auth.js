const express = require('express');
const { signup, login , verifyRole} = require('../controllers/authController');


const router = express.Router();

// Define routes
router.post('/register', signup);
router.post('/login', login);
router.post('/verifyRole', verifyRole);


module.exports = router; // Make sure to export the router
