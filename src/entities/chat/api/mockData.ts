import type { Chat, Message, User } from '../model/types'

export const currentUserId = 'user-1'

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Алексей' },
  { id: 'user-2', name: 'Мария' },
  { id: 'user-3', name: 'Иван' },
]

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    title: 'Мария',
    participantIds: ['user-1', 'user-2'],
    lastMessageId: 'message-2',
    unreadCount: 1,
    updatedAt: '2026-10-14T08:40:00.000Z',
  },
  {
    id: 'chat-2',
    title: 'Иван',
    participantIds: ['user-1', 'user-3'],
    lastMessageId: 'message-3',
    unreadCount: 0,
    updatedAt: '2026-10-13T17:20:00.000Z',
  },
]

export const mockMessages: Message[] = [
  {
    id: 'message-1',
    chatId: 'chat-1',
    authorId: 'user-1',
    text: 'Привет! Как дела?',
    createdAt: '2026-10-14T08:35:00.000Z',
    status: 'read',
  },
  {
    id: 'message-2',
    chatId: 'chat-1',
    authorId: 'user-2',
    text: 'Привет! Всё хорошо.',
    createdAt: '2026-10-14T08:40:00.000Z',
    status: 'delivered',
  },
  {
    id: 'message-3',
    chatId: 'chat-2',
    authorId: 'user-3',
    text: 'Увидимся на встрече выпускников.',
    createdAt: '2026-10-13T17:20:00.000Z',
    status: 'read',
  },
]
