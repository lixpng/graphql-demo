const { ApolloServer } = require('apollo-server-express');
const { schema, mongodb, resolvers } = require('./src')
const express = require('express')
const http = require('http');
 
const typeDefs = schema

const PORT = 8080

const start = async () => {
  const db = await mongodb()
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: (request) => ({
      request,
      db,
    }),
    subscriptions: {
      onConnect: (connectionParams, webSocket) => {
        console.log('websocket')
      },
    },
  });

  const app = express();
  app.get('/', (req, res) => res.send('Hello World!'))
  const httpServer = http.createServer(app);

  server.installSubscriptionHandlers(httpServer);
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
  })
}

start()
