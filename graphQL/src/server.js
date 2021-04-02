const { ApolloServer } = require('apollo-server')
const { schema } = require('./schema')
const { context } = require('./context')

const server = new ApolloServer({
  schema: schema,
  context: context,
})

server.listen().then(async ({ url }) => {
  console.log(`\
 Server ready at: ${url}
 See sample queries: http://pris.ly/e/js/graphql#using-the-graphql-api
  `)
})