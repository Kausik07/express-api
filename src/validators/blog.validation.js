const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    content: Joi.string()
    .min(50)
    .max(500)
    .required()
})

async function validateBlog(user) {
    return schema.validateAsync({
        title: user.title,
        content: user.content
    });
}

module.exports = {
    validateBlog
}
