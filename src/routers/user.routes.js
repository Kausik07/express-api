const { Router } = require('express')
const { getCurrentUser, updateCurrentUser, getAllUsers, getUserById, updateUserById, disableUserById } = require('../controllers/user.controller')
const { verifyUser, verifyAdmin } = require('../middlewares/auth.middleware')


const route = new Router()

route.get('/me', verifyUser, getCurrentUser)

route.patch('/me', verifyUser, updateCurrentUser)

route.get("/", verifyUser, getAllUsers)

route.get("/:usrid", verifyUser, getUserById)

route.patch("/:usrid", verifyUser, verifyAdmin, updateUserById)

route.delete("/:usrid", verifyUser, verifyAdmin, disableUserById)

module.exports = route