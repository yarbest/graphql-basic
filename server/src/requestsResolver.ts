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

export const requestsResolver = {
  Query: {
    getAllUsers: () => {
      return users
    },
    getUser: (_: object, { id }: { id: string }) => {
      return users.find(user => user.id === id)
    },
  },
  // @graphql-tools\schema\cjs\addResolversToSchema
  // requires to wrap in objects - Query/Mutation/Subscription
  Mutation: {
    // In GraphQL resolvers, the first parameter is the parent (or root) object,
    // which is the result returned from the resolver on the parent field.
    // The second parameter is the args object, which contains the arguments passed to the field in the GraphQL query.
    // The first parameter _ is the parent object, which is not used in this resolver.
    createUser: async (_: object, { input }: { input: User }) => {
      const newUser = { ...input, id: Date.now().toString() }
      users.push(newUser)
      await pubsub.publish('USER_CREATED', { userCreated: newUser })
      return newUser
    },
    deleteUser: async (_: object, { id }: { id: string }) => {
      const userIndex = users.findIndex(user => user.id === id)
      if (userIndex === -1) return null

      const deletedUser = users[userIndex]
      users.splice(userIndex, 1)
      await pubsub.publish('USER_DELETED', { userDeleted: deletedUser })
      return deletedUser
    },
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterableIterator(['USER_CREATED']),
    },
    userDeleted: {
      subscribe: () => pubsub.asyncIterableIterator(['USER_DELETED']),
    },
  },
}
