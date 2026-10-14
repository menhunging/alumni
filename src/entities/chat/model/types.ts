export type UserId = string
export type ChatId = string
export type MessageId = string

export interface User {
  id: UserId
  name: string
  avatarUrl?: string
}

export interface Message {
  id: MessageId
  chatId: ChatId
  authorId: UserId
  text: string
  createdAt: string
  status: 'sent' | 'delivered' | 'read'
}

export interface Chat {
  id: ChatId
  title: string
  participantIds: UserId[]
  lastMessageId?: MessageId
  unreadCount: number
  updatedAt: string
}

export interface ChatSummary extends Chat {
  lastMessage?: Message
}

export interface SendMessageInput {
  chatId: ChatId
  authorId: UserId
  text: string
}
