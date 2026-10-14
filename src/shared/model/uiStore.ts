import { create } from 'zustand'

interface UiState {
  isChatListOpen: boolean
  openChatList: () => void
  closeChatList: () => void
}

export const useUiStore = create<UiState>((set) => ({
  isChatListOpen: true,
  openChatList: () => set({ isChatListOpen: true }),
  closeChatList: () => set({ isChatListOpen: false }),
}))
