import type {
  Chat,
  ChatId,
  ChatSummary,
  Message,
  SendMessageInput,
} from '../model/types'
import { mockChats, mockMessages } from './mockData'

const delay = (duration = 150) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, duration))

let chats: Chat[] = structuredClone(mockChats)
let messages: Message[] = structuredClone(mockMessages)

export const chatRepository = {
  async getChats(): Promise<ChatSummary[]> {
    await delay()

    return chats
      .map((chat) => ({
        ...chat,
        lastMessage: messages.find(
          (message) => message.id === chat.lastMessageId,
        ),
      }))
      .sort((first, second) => second.updatedAt.localeCompare(first.updatedAt))
  },

  async getChat(chatId: ChatId): Promise<Chat | null> {
    await delay()
    return chats.find((chat) => chat.id === chatId) ?? null
  },

  async getMessages(chatId: ChatId): Promise<Message[]> {
    await delay()
    return messages
      .filter((message) => message.chatId === chatId)
      .sort((first, second) => first.createdAt.localeCompare(second.createdAt))
  },

  async sendMessage(input: SendMessageInput): Promise<Message> {
    await delay()

    const createdAt = new Date().toISOString()
    const message: Message = {
      ...input,
      id: crypto.randomUUID(),
      createdAt,
      status: 'sent',
    }

    messages = [...messages, message]
    chats = chats.map((chat) =>
      chat.id === input.chatId
        ? { ...chat, lastMessageId: message.id, updatedAt: createdAt }
        : chat,
    )

    return message
  },
}
