const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comment_content: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Comment = mongoose.model('Comments', commentSchema)

module.exports = Comment