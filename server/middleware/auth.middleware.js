const jwt = require('jsonwebtoken');
const { queryRead } = require('../data/db.pool');
const config = require('../core/config');

// Promisify jwt.verify for cleaner async/await usage
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
};

const protect = async (req, res, next) => {
    try {
        let token;
        
        // 1. Check for token in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        
        if (!token) {
            return res.status(401).json({ status: 'error', message: 'You are not logged in. Please log in to get access.' });
        }
        
        // 2. Verify token
        const decoded = await verifyToken(token, config.jwt.secret);
        
        // 3. Check if user still exists (Revocation check)
        const result = await queryRead('SELECT id, role, email FROM users WHERE id = $1', [decoded.id]);
        
        if (result.rowCount === 0) {
            return res.status(401).json({ status: 'error', message: 'The user belonging to this token no longer exists.' });
        }
        
        const currentUser = result.rows[0];
        
        // Grant access to protected route
        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({ status: 'error', message: 'Invalid token or session expired. Please log in again.' });
    }
};

// Role Based Access Control (RBAC)
const restrictTo = (...roles) => {
    return (req, res, next) => {
        // req.user.role would map to Admin, Recruiter, etc.
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ status: 'error', message: 'You do not have permission to perform this action.' });
        }
        next();
    };
};

module.exports = {
    protect,
    restrictTo
};
