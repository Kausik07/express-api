require('dotenv').config()

module.exports = { 
        MONGODB_URI:
            'mongodb://localhost:27017/express-practice',
        PORT: 4000,
        AUTH_PRIVATE_KEY: 'private.key',
        AUTH_PUBLIC_KEY: 'public.key',
        MAIL_USER: process.env.MAIL_USER,
        MAIL_PASS: process.env.MAIL_PASS,
        MAIL_HOST: process.env.MAIL_HOST,
        MAIL_PORT: process.env.MAIL_PORT,
        MAIL_SECURE: false,
    }