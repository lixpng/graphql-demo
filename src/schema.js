const { gql } = require('apollo-server-express');
const typeDefs = gql`
  enum _ModelMutationType {
    CREATED
    UPDATED
    DELETED
  }

  """
  The author of posts
  """
  type Author {
    """
    The id of author
    """
    id: ID,
    name: String,
    age: Int,
    posts: [Post],
  }

  type Post {
    id: ID,
    title: String,
    content: String,
    author: Author,
  }

  type AuthorSubscriptionPayload {
    mutation: _ModelMutationType!
    node: Author
  }

  input AuthorInput {
    name: String,
    age: Int,
  }

  input PostInput {
    title: String,
    content: String,
    author: ID,
  }

  input AuthorSubscriptionFilter {
    mutation_in: [_ModelMutationType!]
  }

  type Query {
    getAuthor(id: ID!): Author,
    getPost(id: ID!): Post,
    allAuthors(option: AuthorInput): [Author],
    allPosts(option: PostInput): [Post],
  }

  type Mutation {
    createAuthor(author: AuthorInput!): Author
    createPost(post: PostInput!): Post
  }

  type Subscription {
    author(filter: AuthorSubscriptionFilter): AuthorSubscriptionPayload
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }

`

module.exports = typeDefs