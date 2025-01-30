export interface User {
  id: string
  username: string
  age: number
}
export type CreateUserInput = Omit<User, 'id'>

export interface GettAllUsersQuery {
  getAllUsers: User[]
}

export interface CreateUserRequest {
  input: CreateUserInput
}

export interface CreateUserResponse {
  createUser: User
}

export interface DeleteUserRequest {
  id: User['id']
}
export interface DeleteUserResponse {
  deleteUser: User
}
