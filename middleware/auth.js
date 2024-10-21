const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateJWT = async (req, res, next) => {
    console.log('authenticateJWT: req.path:', req.path);
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log('Token:', token);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded userId:', decoded.userId);
            console.log('Decoded Token:', decoded);
            const dbUser = await User.findOne({ where: { id: decoded.userId } });
            console.log('User found in DB:', dbUser);
            
            if (!dbUser) {
                return res.sendStatus(403);
            }

            req.user = dbUser; // Assign the full user object to req.user
            next();
        } catch (err) {
            return res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
};


module.exports = { authenticateJWT};
// module.exports = {authenticateJWT, verifyRole};
