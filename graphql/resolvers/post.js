const Post = require("../../models/Post");
const {UserInputError} = require('apollo-server')

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const post = await Post.find();
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
};
