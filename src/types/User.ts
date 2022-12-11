export interface UserOne {
  id: number,
  name: string,
  role: string,
  email: string,
  password: string,
  avatar: string
}

export interface UserReducer {
  users: UserOne[],
  currentUser: UserOne | undefined
}

export interface UserLogin {
    email: string,
    password: string
}

export interface UserRegistrate {
  name: string,
  role: string,
  email: string,
  password: string,
  avatar: string
}