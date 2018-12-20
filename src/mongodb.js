const { MongoClient } = require('mongodb')

const MONGO_URL = 'mongodb://graphql_demo_mongodb:27017'
const DB_NAME = 'graphql_demo'

module.exports = async () => {
  console.log('\n>>>>>>>>>>>>>>>Begin to connect mongodb<<<<<<<<<<<<<<<\n')
  const client = new MongoClient(MONGO_URL)
  try {
    await client.connect()
    console.log('\n>>>>>>>>>>>>>>>>mongodb connected success<<<<<<<<<<<<<<<\n')
    const db = client.db(DB_NAME)
    return {
      Authors: db.collection('authors'),
      Posts: db.collection('posts'),
    };
  } catch(err) {
    console.log('\n>>>>>>>>>>>>>>>>>>>>mongodb connect error:<<<<<<<<<<<<<<<<<<<\n')
    console.log(err)
  }
}
