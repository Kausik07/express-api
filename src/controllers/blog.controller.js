const Blog = require('../models/blog.model');
const Comment = require('../models/comment.model');
const { validateBlog } = require('../validators/blog.validation')

const Create = async (req, res, next) => {
    try {
        const blogData = await validateBlog(req.body);
        const { title, content } = blogData;
        const author = req.userData.sub;
        const blog = new Blog({
            title,
            content,
            author,
        });
        await blog.save();
        res.status(201).json({
            status: 'success',
            message: 'Blog created successfully',
            error: null,
            data: {
                id: blog._id,
                title: blog.title,
                content: blog.content,
            }
        })
    } catch (err) {
        next(err);
    }
}

const ListAll = async (req, res, next) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json({
            status: 'success',
            message: 'Blogs listed successfully',
            error: null,
            data: blogs
        })
    } catch (err) {
        next(err);
    }
}

const ListOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json({
            status: 'success',
            message: 'Blog found successfully',
            error: null,
            data: blog
        })
    } catch (err) {
        next(err);
    }
}

const Update = async (req, res, next) => {
    try {
        const { id } = req.params;
        let blog = await Blog.findById(id);
        if(blog.author != req.userData.sub) {
            throw new Error('You are not authorized to publish this blog');
        }
        const { title, content } = req.body;
        blog = await Blog.findByIdAndUpdate(id, {
            title,
            content,
        }, { new: true });
        res.status(200).json({
            status: 'success',
            message: 'Blog updated successfully',
            error: null,
            data: blog
        })
    } catch (err) {
        next(err);
    }
}

const Delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if(blog.author != req.userData.sub) {
            throw new Error('You are not authorized to delete this blog');
        }
        await Blog.findByIdAndUpdate(id, {
            attributes: {
                isDeleted: true,
            }
        });
        res.status(200).json({
            status: 'success',
            message: 'Blog deleted successfully',
            error: null,
        })
    } catch (err) {
        next(err);
    }
}

const Publish = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if(blog.author != req.userData.sub) {
            throw new Error('You are not authorized to publish this blog');
        }
        await Blog.findByIdAndUpdate(id, {
            attributes: {
                isPublished: true,
            }
        });
        res.status(200).json({
            status: 'success',
            message: 'Blog Published successfully',
            error: null,
        })
    } catch (err) {
        next(err);
    }
}

const Draft = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if(blog.author != req.userData.sub) {
            throw new Error('You are not authorized to draft this blog');
        }
        await Blog.findByIdAndUpdate(id, {
            attributes: {
                isPublished: false,
            }
        });
        res.status(200).json({
            status: 'success',
            message: 'Blog saved to Draft successfully',
            error: null,
        })
    } catch (err) {
        next(err);
    }
}

const ListMine = async (req, res, next) => {
    try {
        const author = req.userData.sub;
        const blogs = await Blog.find({ author });
        res.status(200).json({
            status: 'success',
            message: 'Blogs listed successfully',
            error: null,
            data: blogs
        })
    } catch (err) {
        next(err);
    }
}

const GetComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        let comment = await Comment.findById(commentId).populate('comment_by');
        comment = {
            comment_by: {
                id: comment.comment_by._id,
                name: comment.comment_by.name,
                email: comment.comment_by.email,
                role: comment.comment_by.attributes.role,
            },
            comment_content: comment.comment_content,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
        }
        res.status(200).json({
            status: 'success',
            message: 'Comment found successfully',
            error: null,
            data: comment
        })
    } catch (err) {
        next(err);
    }
}

const PostComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const author = req.userData.sub;
        const comment = new Comment({
            comment_content: content,
            comment_by: author,
        });
        await comment.save();
        await Blog.findByIdAndUpdate(id, {
            $push: {
                comments: comment._id,
            }
        }, { new: true });

        res.status(200).json({
            status: 'success',
            message: 'Comment posted successfully',
            error: null,
            data: comment
        })
    } catch (err) {
        next(err);
    }
}

const GetAllComments = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate('comments');
        res.status(200).json({
            status: 'success',
            message: 'Comments found successfully',
            error: null,
            data: blog.comments
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    Create,
    ListAll,
    ListOne,
    Update,
    Delete,
    Publish,
    Draft,
    ListMine,
    GetComment,
    GetAllComments,
    PostComment
}
