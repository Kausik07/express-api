const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    attributes: {
        isPublished: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }
},{
    timestamps: true
})

blogSchema.methods.setAuthor = function(userID){
    this.author = userID;
}

blogSchema.methods.publishBlog = function(condition){
    this.attributes.isPublished = condition;
}

blogSchema.methods.deleteBlog = function(condition){
    this.attributes.isDeleted = condition;
    this.attributes.isPublished = false;
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog