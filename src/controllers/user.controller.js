const User = require('../models/user.model')

async function getCurrentUser(req, res, next){
    try {
        const user = await User.findById(req.userData.sub)
        res.status(200).json({
            status: 'success',
            message: 'User found',
            error: null,
            data: {
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.attributes.role,
            }
        })
    }
    catch(err){
        next(err)
    }
}

async function updateCurrentUser(req, res, next){
    try {
        const { email, name } = req.body
        const user = await User.findById(req.userData.sub)
        if(email){
            user.email = email
        }
        if(name){
            user.name = name
        }
        await user.save()
        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            error: null,
            data: {
                username: user.username,
                email: user.email,
                name: user.name,
            }
        })
    }
    catch(err){
        next(err)
    }
}

async function getAllUsers(req, res, next){
    const rawUsers = await User.find({
        // 'attributes.isDisabled': false,
        // "attributes.isEmailVerified": true,
    })
    console.log(rawUsers)
    let users = []
    for (const u of rawUsers) {
        u.hash = undefined
        u.salt = undefined
        u.attributes = {
            role: u.attributes.role,
        }
        users.push(u)
    }
    res.status(200).json({
        status: 'success',
        message: 'Users found',
        error: null,
        data: users
    })
}

async function getUserById(req, res, next){
    try {
        if(!req.params.usrid){
            throw new Error('User id is required')
        }
        let user = {}
        if(req.query.u_type === 'oid'){
            user = await User.findById(req.params.usrid)
        }
        else{
            user = await User.findOne({username: req.params.usrid})
        }
        if(!user){
            throw new Error('User not found')
        }
        res.status(200).json({
            status: 'success',
            message: 'User found',
            error: null,
            data: {
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.attributes.role,
            }
        })
    }
    catch(err){
        next(err)
    }
}

async function updateUserById(req, res, next){
    try {
        if(!req.params.usrid){
            throw new Error('User id is required')
        }
        const { email, name } = req.body
        const user = await User.findById(req.params.usrid)
        if(email){
            user.email = email
        }
        if(name){
            user.name = name
        }
        await user.save()
        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            error: null,
            data: {
                username: user.username,
                email: user.email,
                name: user.name,
            }
        })
    }
    catch(err){
        next(err)
    }
}

async function disableUserById(req, res, next){
    try {
        if(!req.params.usrid){
            throw new Error('User id is required')
        }
        const user = await User.findById(req.params.usrid)
        if(!user){
            throw new Error('User not found')
        }
        user.attributes.isDisabled = true
        await user.save()
        res.status(200).json({
            status: 'success',
            message: 'User disabled successfully',
            error: null,
            data: {
                username: user.username,
                attributes: {
                    isDisabled: user.attributes.isDisabled,
                    role: user.attributes.role,
                },
            }
        })
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    getCurrentUser,
    updateCurrentUser,
    getAllUsers,
    getUserById,
    updateUserById,
    disableUserById,
}