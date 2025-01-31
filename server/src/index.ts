import { makeExecutableSchema } from '@graphql-tools/schema'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'
// eslint-disable-next-line import/no-unresolved
import { useServer } from 'graphql-ws/use/ws'
import { WebSocketServer } from 'ws'

import { createServer, RequestListener } from 'http'

import { MutationTypeWithResolvers, QueryTypeWithResolvers, SubscriptionTypeWithResolvers } from './schemas/userSchema'

dotenv.config()

const app = express()
app.use(cors())

// https://www.apollographql.com/docs/apollo-server/data/subscriptions
const schema = makeExecutableSchema({
  typeDefs: new GraphQLSchema({
    query: QueryTypeWithResolvers,
    mutation: MutationTypeWithResolvers,
    subscription: SubscriptionTypeWithResolvers,
  }),
})

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
}))

const PORT = process.env.PORT ?? 5000
// we have to use http.createServer instead of app.listen because we need to pass the server to the WebSocketServer
const server = createServer(app as RequestListener)

const wsServer = new WebSocketServer({
  server,
  path: '/subscriptions',
})

useServer({ schema }, wsServer)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
