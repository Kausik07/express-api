const { verifyJWT } = require('../lib/auth.adapter')

async function verifyUser(req, res, next) {
    try {
        if(!req.headers.authorization){
            throw new Error('No authorization header')
        }
        const token = (req.headers.authorization.split(' ')[1])
        const decoded = await verifyJWT(token)
        req.userData = decoded
        next()
    } catch (err) {
        next(err)
    }
}

async function verifyAdmin(req, res, next) {
    try {
        if(req.userData.role !== 'admin'){
            throw new Error('You are not an admin')
        }
        next()
    } catch (err) {
        next(err)
    }
    
}

module.exports = {
    verifyUser,
    verifyAdmin
}