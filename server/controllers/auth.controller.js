const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { query } = require('../data/db.pool');
const config = require('../core/config');

const signToken = (id, role, email) => {
    return jwt.sign({ id, role, email }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id, user.role, user.email);

    // Remove password from output
    user.password_hash = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.register = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Please provide email and password' });
        }

        const password_hash = await bcrypt.hash(password, 12);
        
        const result = await query(
            'INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, role',
            [email, password_hash, firstName, lastName, 'Client']
        );
        
        const newUser = result.rows[0];

        createSendToken(newUser, 201, res);
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Please provide email and password' });
        }

        const result = await query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (result.rowCount === 0) {
            // Prevent timing attacks with a dummy hash comparison
            await bcrypt.compare(password, '$2a$12$dummyhashdummyhashdummyhashdummyhashdummyhashdummyhash');
            return res.status(401).json({ status: 'error', message: 'Incorrect email or password' });
        }
        
        const user = result.rows[0];
        const correct = await bcrypt.compare(password, user.password_hash);

        if (!correct) {
            return res.status(401).json({ status: 'error', message: 'Incorrect email or password' });
        }

        createSendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

exports.getMe = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user
        }
    });
};
