const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configs');

async function generateJWT(user) {
    const payload = {
        sub: user.id,
        username: user.username,
    };
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d',
        encoding: 'utf8',
    });
}

async function verifyJWT(token) {
    const payload = jwt.verify(token, JWT_SECRET, {
        algorithms: ['HS256'],
        encoding: 'utf8',
    });
    if(!payload){
        throw new Error('Invalid or expired token');
    }
    return payload;
}

module.exports = {
    generateJWT,
    verifyJWT,
}