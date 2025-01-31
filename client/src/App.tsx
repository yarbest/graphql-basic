import { useUser } from './hooks/useUser'

function App() {
  const {
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
  } = useUser()

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
