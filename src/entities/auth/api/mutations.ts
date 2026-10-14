import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../model/authStore'
import { authRepository } from './authRepository'

export function useLogin() {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: authRepository.login,
    onSuccess: setSession,
  })
}

export function useRequestLoginCode() {
  return useMutation({
    mutationFn: authRepository.requestLoginCode,
  })
}

export function useLoginWithCode() {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: authRepository.loginWithCode,
    onSuccess: setSession,
  })
}
