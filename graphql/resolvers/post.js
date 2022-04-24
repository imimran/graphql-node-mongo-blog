const Post = require("../../models/Post");
const {UserInputError} = require('apollo-server');
const checkAuth = require("../../utils/authCheck");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const post = await Post.find().sort("createdAt");
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
    viewPost: async (_, { postId }) => {
      try {
        const post = await Post.findOne({_id:postId});
        if(!post){
            throw new UserInputError("User Not Found", {
                errors
            })
        }
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, {body}, context){
      const user = checkAuth(context)
      console.log("user", user);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      })

      const post = await newPost.save()
      return post;
    }
  }
};
