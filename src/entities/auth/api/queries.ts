import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../model/authStore";
import { authRepository } from "./authRepository";

export const authKeys = {
  currentUser: ["auth", "me"] as const,
};

export function useCurrentUser() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...authKeys.currentUser, accessToken],
    queryFn: authRepository.getMe,
    enabled: Boolean(accessToken),
    retry: false,
    staleTime: 5 * 60_000,
  });
}
