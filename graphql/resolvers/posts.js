const Post = require("../../models/Post");

module.exports = {
  Query: {
    async getPosts() {
      try {
        return await Post.find();
      } catch (error) {
        throw new Error(error);
      }
    },

    async getPost(_, { postId }) {
      // console.log(postId);
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
