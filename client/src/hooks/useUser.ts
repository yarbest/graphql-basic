import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'

import { CREATE_USER, DELETE_USER } from '../mutation/userMutation'
import { GET_ALL_USERS, USER_CREATED, USER_DELETED } from '../query/userQuery'
import {
  CreateUserRequest,
  CreateUserResponse,
  CreateUserSubscriptionData,
  DeleteUserRequest,
  DeleteUserResponse,
  GettAllUsersQuery,
} from '../types/userTypes'

export const useUser = () => {
  const {
    data: users,
    loading,
    error,
    refetch: refetchUsers,
  } = useQuery<GettAllUsersQuery>(GET_ALL_USERS)

  const [
    createUserMutation,
    { loading: createUserLoading },
  ] = useMutation<CreateUserResponse, CreateUserRequest>(CREATE_USER)

  const [
    deleteUserMutation,
  ] = useMutation<DeleteUserResponse, DeleteUserRequest>(DELETE_USER)

  // creating/deleting user in one tab will trigger refetching users in all tabs
  useSubscription(USER_CREATED, {
    onSubscriptionData: ({ subscriptionData }: CreateUserSubscriptionData) => {
      if (subscriptionData.data) {
        void refetchUsers()
      }
    },
  })
  useSubscription(USER_DELETED, {
    onSubscriptionData: () => {
      void refetchUsers()
    },
  })

  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)

  const createUser = async () => {
    if (!username || !age) return

    await createUserMutation({
      variables: {
        input: {
          username,
          age,
        },
      },
    })

    setUsername('')
    setAge(0)
  }

  const deleteUser = async (id: string) => {
    await deleteUserMutation({
      variables: {
        id,
      },
    })

    await refetchUsers()
  }

  return {
    username,
    age,
    setUsername,
    setAge,
    createUser,
    deleteUser,
    users,
    loading,
    createUserLoading,
    error,
    refetchUsers,
  }
}
