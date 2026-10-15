export interface LoginCredentials {
  email: string
  password: string
}

export interface RequestLoginCodeInput {
  email: string
}

export interface PendingCodeLogin {
  userId: number
  email: string
}

export interface LoginWithCodeInput extends PendingCodeLogin {
  code: string
}

export interface AuthUser {
  id: number
  login: string
  email: string
  name: string
  surname: string
  profileCompleted: boolean
  registrationDate?: string
  lastActiveDate: string
}
