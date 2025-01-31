import {
  buildSchema,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import { requestsResolver } from '../requestsResolver'

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
})

// replaces this:
// type User {
//   id: ID
//   username: String
//   age: Int
//   posts: [Post]
// }
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    age: { type: GraphQLInt },
    posts: { type: new GraphQLList(PostType) },
  },
})

export const PostInputType = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
})

// replaces this:
// input UserInput {
//   id: ID
//   username: String!
//   age: Int!
//   posts: [PostInput]
// }
export const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    id: { type: GraphQLID },
    username: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    posts: { type: new GraphQLList(PostInputType) },
  },
})

export const QueryTypeWithResolvers = new GraphQLObjectType({
  name: 'Query',
  fields: {
    // replaces this and includes with resolvers:
    // type Query {
    //   getAllUsers: [User]
    //   getUser(id: ID!): User
    // }
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve: requestsResolver.Query.getAllUsers,
    },
    getUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: requestsResolver.Query.getUser,
    },
  },
})

export const MutationTypeWithResolvers = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // replaces this:
    // type Mutation {
    //   createUser(input: UserInput!): User
    //   deleteUser(id: ID!): User
    // }
    createUser: {
      type: UserType,
      args: { input: { type: new GraphQLNonNull(UserInputType) } },
      resolve: requestsResolver.Mutation.createUser,
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: requestsResolver.Mutation.deleteUser,
    },
  },
})

export const SubscriptionTypeWithResolvers = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    // replaces this:
    // type Subscription {
    //   userCreated: User!
    //   userDeleted: User
    // }
    userCreated: {
      type: new GraphQLNonNull(UserType),
      subscribe: requestsResolver.Subscription.userCreated,
    },
    userDeleted: {
      type: UserType,
      subscribe: requestsResolver.Subscription.userDeleted,
    },
  },
})

// THIS IS ALTERNATIVE TO THE ABOVE CODE, BUT WRITING SCHEMA IN STRING IS NOT SECURE

export const stringSchema = buildSchema(/* GraphQL */ `
  type User {
    id: ID!
    username: String!
    age: Int
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String
  }

  input UserInput {
    id: ID
    username: String!
    age: Int!
    posts: [PostInput]
  }

  input PostInput {
    id: ID
    title: String!
    content: String!
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput!): User
    deleteUser(id: ID!): User
  }

  type Subscription {
    userCreated: User!
    userDeleted: User
  }
`,
)
