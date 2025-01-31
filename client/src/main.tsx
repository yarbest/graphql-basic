import { ApolloClient, ApolloProvider, InMemoryCache, split, HttpLink } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { Kind, OperationTypeNode } from 'graphql'
import { createClient } from 'graphql-ws'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
})

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5000/subscriptions',
}))

// https://www.apollographql.com/docs/react/data/subscriptions#3-split-communication-by-operation-recommended
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === Kind.OPERATION_DEFINITION
      && definition.operation === OperationTypeNode.SUBSCRIPTION
    )
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
