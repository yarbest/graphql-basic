import { gql } from '@apollo/client'

export const CREATE_USER = gql/* GraphQL */`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      id
      username
      age
    }
  }
`
export const DELETE_USER = gql/* GraphQL */`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
      age
    }
  }
`
