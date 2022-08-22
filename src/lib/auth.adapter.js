const jwt = require('jsonwebtoken');
const fs = require('fs');
const { JWT_SECRET, AUTH_PRIVATE_KEY, AUTH_PUBLIC_KEY } = require('../configs');

const publicKey = fs.readFileSync(AUTH_PUBLIC_KEY);
const privateKey = fs.readFileSync(AUTH_PRIVATE_KEY);

async function generateJWT(user) {
    const payload = {
        sub: user.id,
        username: user.username,
        role: user.attributes.role,
    };
    return jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1d',
        encoding: 'utf8',
    });
}

async function verifyJWT(token) {
    const payload = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
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