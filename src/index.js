const mongodb = require('./mongodb')
const schema = require('./schema/schema')
const resolvers = require('./schema/resolvers')

module.exports = {
  mongodb,
  resolvers,
  schema,
}