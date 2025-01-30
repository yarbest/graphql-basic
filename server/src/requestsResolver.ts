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
  getAllUsers: () => {
    return users
  },
  getUser: ({ id }: { id: string }) => {
    return users.find(user => user.id === id)
  },

  createUser: ({ input }: { input: User }) => {
    const newUser = { ...input, id: Date.now().toString() }
    users.push(newUser)
    return newUser
  },

  deleteUser: ({ id }: { id: string }) => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    const deletedUser = users[userIndex]
    users.splice(userIndex, 1)
    return deletedUser
  },
}
