const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded userId:', decoded.userId);
            console.log('Decoded Token:', decoded);
            const dbUser = await User.findOne({ where: { id: decoded.userId } });
           
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
