import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'

import { CREATE_USER, DELETE_USER } from './mutation/userMutation'
import { GET_ALL_USERS } from './query/userQuery'
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GettAllUsersQuery,
} from './types/userTypes'

function App() {
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

    await refetchUsers()

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

  if (loading) return <p>Users Loading...</p>
  if (createUserLoading) return <p>Creating User...</p>
  if (error) return (
    <p>
      Error:
      {error.message}
    </p>
  )

  return (
    <div>
      <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="number" placeholder="age" value={age} onChange={e => setAge(Number(e.target.value))} />
      <div>
        <button onClick={() => void createUser()}>Create User</button>
        <button onClick={() => void refetchUsers()}>Get Users</button>
      </div>

      <p>Users:</p>
      <div>
        {users?.getAllUsers.map(user => (
          <div key={user.id}>
            <p>
              <span>{user.username}</span>
              {' '}
              <span>{user.age}</span>
              <button onClick={() => void deleteUser(user.id)}>Delete</button>
            </p>
            <p></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
