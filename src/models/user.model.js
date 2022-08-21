const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        first: {
            type: String,
            required: false
        },
        last: {
            type: String,
            required: false
        }
    },
    attributes: {
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        emailVerificationToken: {
            type: String,
            default: null
        },
        resetToken: {
            type: String,
            default: null
        },
        lastResetDate: {
            type: Date,
            default: null
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}
 
userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

userSchema.methods.validateEmailVerificationToken = function(token) {
    if(this.attributes.emailVerificationToken === token) {
        this.attributes.emailVerificationToken = null;
        return true;
    }
    return false;
}

userSchema.methods.generateEmailVerificationToken = function() {
    const token = crypto.randomBytes(32).toString('hex');
    this.attributes.emailVerificationToken = token;
}

userSchema.methods.validateResetToken = function(token) {
    if(this.attributes.resetToken === token) {
        this.attributes.resetToken = null;
        return true;
    }
    return false;
}

userSchema.methods.generateResetToken = function() {
    const token = crypto.randomBytes(32).toString('hex');
    this.attributes.resetToken = token;
}

const User = mongoose.model('User', userSchema)

module.exports = User;