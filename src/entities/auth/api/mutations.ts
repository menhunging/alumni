import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../model/authStore'
import { authRepository } from './authRepository'

export function useLogin() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  return useMutation({
    mutationFn: authRepository.login,
    onSuccess: setAccessToken,
  })
}
