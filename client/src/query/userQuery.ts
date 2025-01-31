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

export const USER_CREATED = gql/* GraphQL */`
  subscription {
    userCreated {
      id
      username
      age
    }
  }
`

// requires atleast one field to be returned, otherwise it doesn't listen to event
export const USER_DELETED = gql/* GraphQL */`
  subscription {
    userDeleted {
      id
    }
  }
`
