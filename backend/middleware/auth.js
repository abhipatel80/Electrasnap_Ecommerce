const jwt = require('jsonwebtoken');
const usermodel = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(403).send("Please login to access this resource.");
        } else {
            const data = jwt.verify(token, process.env.JWT_KEY)
            req.user = await usermodel.findById(data.id);
        }
        next();
    } catch (e) {
        res.status(402).json(e);
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(401).json(`Role: ${req.user.role} is not allowed to access this resource`, 403);
        }
        next();
    };
};

module.exports = {
    auth,
    authorizeRoles
} 