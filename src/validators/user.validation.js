const Joi = require('joi'); 

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2} ).required(),
    name: {
            first: Joi.string().min(3).max(30),
            last: Joi.string().min(3).max(30)
    }
});

async function validateUser(user) {
    return schema.validateAsync({
        username: user.username,
        password: user.password,
        email: user.email,
        name: { first: user.name.first, last: user.name.last }
    });
}

module.exports = {
    validateUser
}
    