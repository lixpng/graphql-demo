const { ObjectId } = require('mongodb')
const pubsub = require('./pubsub')

const resolvers = {
  Query: {
    async getAuthor(root, { id },  { db: { Authors }}) {
      return await Authors.findOne({ _id: ObjectId(id) })
    },
    async getPost(root, { id },   { db: { Posts }}) {
      return await Posts.findOne({ _id: ObjectId(id) })
    },
    async allAuthors(root, { option }, { db: { Authors }}) {
      return await Authors.find(option).toArray()
    },
    async allPosts(root, { option }, { db: { Posts }}) {
      option.author && (option.author = ObjectId(option.author))
      return await Posts.find(option).toArray()
    },
  },
  Mutation: {
    async createAuthor(root, { author }, { db: { Authors }}) {
      const { name } = author

      const exist = await Authors.findOne({ name })
      if (exist) {
        throw new Error('already existed')
      }

      await Authors.insertOne(author)
      pubsub.publish('authorChanged', { author: { mutation: 'CREATED', node: author }});
      // const { result, insertedId } = await Authors.insertOne(author)
      return author
    },

    async createPost(root, { post }, { db: { Posts }}) {
      post.author = ObjectId(post.author)
      let { title, author } = post
      
      const exist = await Posts.findOne({ title, author })
      if (exist) {
        throw new Error('already existed')
      }

      await Posts.insertOne(post)
      return post
    },
  },
  Subscription: {
    author: {
      subscribe: () => pubsub.asyncIterator('authorChanged'),
    },
  },
  Author: {
    id: (root, params, ctx, opt) => {
      return root._id.toString()
    },
    posts: async (root, params, { db: { Posts }}) => {
      return await Posts.find({ author: root._id }).toArray()
    }
  },
  Post: {
    id: (root, params, ctx, opt) => {
      return root._id.toString()
    },
    author: async (root, params, { db: { Authors }}) => {
      return await Authors.findOne({ _id: root.author })
    }
  }
}

module.exports = resolvers