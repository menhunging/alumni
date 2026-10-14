import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import type { ChatId, SendMessageInput } from '../model/types'
import { chatRepository } from './chatRepository'

export const chatKeys = {
  all: ['chats'] as const,
  detail: (chatId: ChatId) => ['chats', chatId] as const,
  messages: (chatId: ChatId) => ['chats', chatId, 'messages'] as const,
}

export function useChats() {
  return useQuery({
    queryKey: chatKeys.all,
    queryFn: chatRepository.getChats,
  })
}

export function useChat(chatId: ChatId | undefined) {
  return useQuery({
    queryKey: chatKeys.detail(chatId ?? ''),
    queryFn: () => chatRepository.getChat(chatId as ChatId),
    enabled: Boolean(chatId),
  })
}

export function useMessages(chatId: ChatId | undefined) {
  return useQuery({
    queryKey: chatKeys.messages(chatId ?? ''),
    queryFn: () => chatRepository.getMessages(chatId as ChatId),
    enabled: Boolean(chatId),
  })
}

export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: SendMessageInput) =>
      chatRepository.sendMessage(input),
    onSuccess: (_, input) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: chatKeys.all }),
        queryClient.invalidateQueries({
          queryKey: chatKeys.messages(input.chatId),
        }),
        queryClient.invalidateQueries({
          queryKey: chatKeys.detail(input.chatId),
        }),
      ]),
  })
}
