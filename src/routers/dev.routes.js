const { Router } = require('express');

const route = new Router();

route.get('/test', function(req, res) {
    res.send('Hello World');
})

module.exports = route;