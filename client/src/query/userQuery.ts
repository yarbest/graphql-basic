import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql/* GraphQL */`
  query {
    getAllUsers {
      id
      username
      age
    }
  }
`

export const GET_USER = gql/* GraphQL */`
  query getUser($id: ID!) {
    getUsers(id: $id) {
      id
      username
      age
    }
  }
`
