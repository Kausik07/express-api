const User = require('../models/user.model')
const { generateJWT } = require('../lib/auth.adapter')

async function createUser(req, res, next) {
    try {
        const { username, email, name, password  } = req.body
        const checkIfUserNameExists = await User.findOne({ username })
        const checkIfEmailExists = await User.findOne({ email })
        if( checkIfUserNameExists || checkIfEmailExists ){
            throw new Error('Username or email already exists')
        }
        const user = new User({
            username,
            email,
            name,
        })
        await user.setPassword(password)
        await user.generateEmailVerificationToken()
        await user.save()
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: {
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.attributes.role,
            }
        })
    }
    catch(err){
        next()
    }
}

async function loginUser(req, res, next) {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if(!user){
            throw new Error('User not found')
        }
        if(!user.validatePassword(password)){
            throw new Error('Invalid password')
        }
        const token = await generateJWT(user)
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            data: {
                access_token: token,
            }
        })
    }
    catch(err){
        next()
    }
}

async function verifyEmail(req, res, next) {
    try {
        const { token } = req.query
        const user = await User.findOne({ emailVerificationToken: token })
        const validEmail = user.validateEmailVerificationToken(token)
        if(!validEmail){
            throw new Error('Unable to verify Email Verification Token')
        }
        else{
        await user.save()
            res.status(200).json({
                status: 'success',
                message: 'Email verified successfully',
            })
        }
    }
    catch(err){
        next()
    }
}