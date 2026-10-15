# Структура проекта Alumni Messenger

Проект использует облегчённую архитектуру Feature-Sliced Design.

app — инициализация, роутинг, провайдеры
pages — страницы
widgets — крупные блоки (ChatList, ChatWindow)
features — действия пользователя (SendMessage)
entities — модели и API чатов
shared — общий UI-state и инфраструктура

## Корень проекта

- `Instructions.md` — требования к стеку, архитектуре и работе со стилями.
- `package.json` — зависимости проекта и npm-команды:
  - `npm run dev` — запуск сервера разработки;
  - `npm run build` — TypeScript-проверка и production-сборка;
  - `npm run lint` — проверка ESLint.
- `package-lock.json` — фиксирует точные версии зависимостей.
- `index.html` — HTML-точка входа с элементом `<div id="root">`.
- `vite.config.ts` — конфигурация Vite и React.
- `eslint.config.js` — правила проверки TypeScript и React.
- `tsconfig.json` — объединяет TypeScript-конфигурации проекта.
- `tsconfig.app.json` — строгие настройки TypeScript для приложения.
- `tsconfig.node.json` — настройки TypeScript для Vite и конфигурационных файлов.
- `.gitignore` — исключает `node_modules`, `dist`, coverage и системные файлы.

## Запуск приложения

- `src/main.tsx` — создаёт React-приложение, подключает глобальные стили и провайдеры.
- `src/vite-env.d.ts` — добавляет типы Vite, включая поддержку импортов SCSS Modules.
- `src/app/App.tsx` — запускает `RouterProvider`.
- `src/app/providers/AppProviders.tsx` — создаёт `QueryClient` и подключает TanStack Query.
- `src/app/router.tsx` — описывает маршруты `/login`, `/chats` и `/chats/:chatId`.

## Защита маршрутов

- `src/app/router/ProtectedRoute.tsx` — запрещает доступ к чатам без авторизации и перенаправляет на `/login`.
- `src/app/router/GuestRoute.tsx` — не позволяет авторизованному пользователю повторно открыть `/login`.

## Авторизация

- `src/entities/auth/model/types.ts` — типы данных формы входа и пользовательской сессии.
- `src/entities/auth/model/authStore.ts` — Zustand-хранилище сессии с сохранением в `localStorage`.
- `src/shared/api/apiClient.ts` — общий Axios-клиент с `baseURL`, timeout, Bearer-токеном и обработкой `401`.
- `.env.example` — пример переменной `VITE_API_BASE_URL`.
- `src/entities/auth/api/authRepository.ts` — запросы входа по email/паролю и получения текущего пользователя.
- `src/entities/auth/api/mutations.ts` — TanStack Mutation для входа и сохранения полученной сессии.
- `src/entities/auth/api/queries.ts` — TanStack Query для проверки сессии через `/me/`.

## Форма входа

- `src/features/Login/LoginForm.tsx` — форма входа на React Hook Form с Zod-валидацией и обработкой ошибок.
- `src/features/Login/LoginForm.module.scss` — структурные классы формы без готового дизайна.

## Страница входа

- `src/pages/LoginPage/LoginPage.tsx` — отображает форму и после входа возвращает пользователя на изначально запрошенную страницу.
- `src/pages/LoginPage/LoginPage.module.scss` — структурные классы страницы входа.

## Сущность чата

- `src/entities/chat/model/types.ts` — типы `User`, `Chat`, `Message` и `ChatSummary`.
- `src/entities/chat/api/mockData.ts` — временные пользователи, чаты и сообщения.
- `src/entities/chat/api/chatRepository.ts` — mock API для получения чатов, сообщений и отправки сообщения.
- `src/entities/chat/api/queries.ts` — TanStack Query-хуки:
  - `useChats`;
  - `useChat`;
  - `useMessages`;
  - `useSendMessage`.

## Список чатов

- `src/widgets/ChatList/ChatList.tsx` — загружает и отображает список чатов, активный чат и количество непрочитанных сообщений.
- `src/widgets/ChatList/ChatList.module.scss` — структурные классы списка чатов.

## Окно переписки

- `src/widgets/ChatWindow/ChatWindow.tsx` — загружает выбранный чат и сообщения, отображает состояния загрузки, ошибки и отсутствия данных.
- `src/widgets/ChatWindow/ChatWindow.module.scss` — структурные классы окна переписки.

## Отправка сообщения

- `src/features/SendMessage/MessageForm.tsx` — форма сообщения с валидацией и вызовом `useSendMessage`.
- `src/features/SendMessage/MessageForm.module.scss` — структурные классы формы.

## Основной layout и страница чатов

- `src/app/layouts/AppLayout/AppLayout.tsx` — общий layout авторизованной части приложения с меню, выходом и областью контента.
- `src/app/layouts/AppLayout/AppLayout.module.scss` — стили бокового меню и основной раскладки.
- `src/pages/ChatsPage/ChatsPage.tsx` — объединяет список чатов и окно переписки.
- `src/pages/ChatsPage/ChatsPage.module.scss` — базовая раскладка страницы чатов.

## Общее состояние и стили

- `src/shared/model/uiStore.ts` — Zustand-состояние интерфейса: открыт или закрыт список чатов.
- `src/styles/global.scss` — глобальный reset и базовые правила без самостоятельного дизайна.

## Автоматические директории

- `node_modules/` — установленные зависимости. Не редактируется вручную.
- `dist/` — результат `npm run build`. Пересоздаётся при каждой сборке.

## Поток авторизации

```text
LoginForm
  → useLogin
  → authRepository.login
  → authStore
  → ProtectedRoute
  → AppLayout
```