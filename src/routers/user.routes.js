const { Router } = require('express')
const { createUser, loginUser, verifyEmail } = require('../controllers/user.controller')

const route = new Router()

route.post('/register', function (req, res, next) {
    createUser(req, res, next)
})

route.post('/login', function (req, res, next) {
    loginUser(req, res, next)
})

route.get("/verify-email", function(req, res, next){
    verifyEmail(req, res, next)
})

module.exports = route