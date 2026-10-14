import type { User } from '../../chat/model/types'

export interface LoginCredentials {
  login: string
  password: string
}

export interface RequestLoginCodeInput {
  login: string
}

export interface CodeLoginCredentials extends RequestLoginCodeInput {
  code: string
}

export interface AuthSession {
  accessToken: string
  user: User
}
