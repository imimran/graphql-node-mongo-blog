const {model, Schema} = require('mongoose')

const postSchema = new Schema({
    body: String,
    username: String,
    comments : [
        {
            body: String,
            username: String,
            createAt: String
        }
    ],

    likes : [
        {
            username: String,
            createAt: String
        }
    ],

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
    
}, {timestamps: true})

const Post = model('Post', postSchema)

module.exports = Post