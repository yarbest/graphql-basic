import { buildSchema } from 'graphql'

export const schema = buildSchema(/* GraphQL */ `
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
`)
