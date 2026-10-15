export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: number
  login: string
  email: string
  name: string
  surname: string
  registrationDate?: string
  lastActiveDate: string
}
