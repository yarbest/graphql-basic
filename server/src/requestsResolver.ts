import { GraphQLFieldResolver } from 'graphql'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

interface User {
  id: string
  username: string
  age: number
}

// Dummy data, no need for DB, just for testing,
// in other repositories there are plenty of examples with DB
const users: User[] = [
  { id: '1', username: 'Alice', age: 25 },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Resolver = GraphQLFieldResolver<any, any, Record<string, any>>
type RequestType = 'Query' | 'Mutation' | 'Subscription'

export const requestsResolver: Record<RequestType, Record<string, Resolver>> = {
  Query: {
    getAllUsers: () => {
      return users
    },
    getUser: (_, { id }: Record<string, string>) => {
      return users.find(user => user.id === id)
    },
  },
  Mutation: {
    createUser: async (_: object, { input }: Record<string, User>) => {
      const newUser = { ...input, id: Date.now().toString() }
      users.push(newUser)
      await pubsub.publish('USER_CREATED', { userCreated: newUser })
      return newUser
    },
    deleteUser: async (_: object, { id }: Record<string, string>) => {
      const userIndex = users.findIndex(user => user.id === id)
      if (userIndex === -1) return null

      const deletedUser = users[userIndex]
      users.splice(userIndex, 1)
      await pubsub.publish('USER_DELETED', { userDeleted: deletedUser })
      return deletedUser
    },
  },
  Subscription: {
    userCreated: () => pubsub.asyncIterableIterator(['USER_CREATED']),
    userDeleted: () => pubsub.asyncIterableIterator(['USER_DELETED']),
  },
}
