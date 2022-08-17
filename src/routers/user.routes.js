const { Router } = require('express')

const route = new Router()

route.get('/me', function (req, res) {
    res.send('Hello World')
})

module.exports = route