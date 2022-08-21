const { Router } = require('express')
const { createUser, loginUser, verifyEmail } = require('../controllers/auth.controller')

const route = new Router()

route.post('/register', createUser)

route.post('/login', loginUser)

route.get("/verify-email", verifyEmail)

module.exports = route