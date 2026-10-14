import { mockUsers } from '../../chat/api/mockData'
import type {
  AuthSession,
  CodeLoginCredentials,
  LoginCredentials,
  RequestLoginCodeInput,
} from '../model/types'
import { mockCredentials, mockLoginCode } from './mockCredentials'

const requestDelay = 300

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid login or password')
    this.name = 'InvalidCredentialsError'
  }
}

export class InvalidLoginCodeError extends Error {
  constructor() {
    super('Invalid login code')
    this.name = 'InvalidLoginCodeError'
  }
}

const createMockSession = (): AuthSession => {
  const user = mockUsers[0]

  if (!user) {
    throw new Error('Mock user is not configured')
  }

  return {
    accessToken: 'mock-access-token',
    user,
  }
}

export const authRepository = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, requestDelay))

    if (
      credentials.login !== mockCredentials.login ||
      credentials.password !== mockCredentials.password
    ) {
      throw new InvalidCredentialsError()
    }

    return createMockSession()
  },

  async requestLoginCode({ login }: RequestLoginCodeInput): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, requestDelay))

    if (login !== mockCredentials.login) {
      throw new InvalidCredentialsError()
    }
  },

  async loginWithCode(
    credentials: CodeLoginCredentials,
  ): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, requestDelay))

    if (
      credentials.login !== mockCredentials.login ||
      credentials.code !== mockLoginCode
    ) {
      throw new InvalidLoginCodeError()
    }

    return createMockSession()
  },
}
