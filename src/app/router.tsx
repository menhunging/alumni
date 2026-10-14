import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout/AppLayout'
import { ChatsPage } from '../pages/ChatsPage/ChatsPage'
import { HomePage } from '../pages/HomePage/HomePage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { SectionPage } from '../pages/SectionPage/SectionPage'
import { GuestRoute } from './router/GuestRoute'
import { ProtectedRoute } from './router/ProtectedRoute'

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'chats',
            element: <ChatsPage />,
          },
          {
            path: 'chats/:chatId',
            element: <ChatsPage />,
          },
          {
            path: 'groups',
            element: <SectionPage title="Группы" />,
          },
          {
            path: 'events',
            element: <SectionPage title="Мероприятия" />,
          },
          {
            path: 'members',
            element: <SectionPage title="Участники" />,
          },
          {
            path: 'notifications',
            element: <SectionPage title="Уведомления" />,
          },
          {
            path: 'settings',
            element: <SectionPage title="Настройки" />,
          },
          {
            path: '*',
            element: <Navigate to="/" replace />,
          },
        ],
      },
    ],
  },
])
