require('dotenv').config()

module.exports = { 
        MONGODB_URI:
            'mongodb://localhost:27017/express-practice',
        PORT: 4000,
        JWT_SECRET: '0389i45hjfg03hj450hj3w04th3084hjf038i4hjf903wihj4tfg903wihjn4tfg',
        MAIL_USER: process.env.MAIL_USER,
        MAIL_PASS: process.env.MAIL_PASS,
        MAIL_HOST: process.env.MAIL_HOST,
        MAIL_PORT: process.env.MAIL_PORT,
        MAIL_SECURE: false,
    }