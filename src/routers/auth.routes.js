const { Router } = require('express')
const { CreateUser, loginUser, verifyEmail } = require('../controllers/auth.controller')

const route = new Router()

route.post('/register', CreateUser)

route.post('/login', loginUser)

route.get("/verify-email", verifyEmail)

module.exports = route