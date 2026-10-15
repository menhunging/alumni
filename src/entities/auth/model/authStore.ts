import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
      clearSession: () => set({ accessToken: null }),
    }),
    {
      name: "alumni-auth",
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as
          | {
              accessToken?: unknown;
              session?: { accessToken?: unknown };
            }
          | undefined;
        const storedToken =
          persisted?.accessToken ?? persisted?.session?.accessToken;

        return {
          ...currentState,
          accessToken: typeof storedToken === "string" ? storedToken : null,
        };
      },
    },
  ),
);
