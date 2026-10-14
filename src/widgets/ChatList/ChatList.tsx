import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useChats } from '../../entities/chat/api/queries'
import styles from './ChatList.module.scss'

type ChatFilter = 'all' | 'group' | 'personal'

function formatChatTime(value: string) {
  const date = new Date(value)
  const now = new Date()
  const dayDifference = Math.floor(
    (now.setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0)) /
      86_400_000,
  )

  if (dayDifference === 0) {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (dayDifference === 1) {
    return 'Вчера'
  }

  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
  })
}

export function ChatList() {
  const [filter, setFilter] = useState<ChatFilter>('personal')
  const chatsQuery = useChats()

  if (chatsQuery.isPending) {
    return <p className={styles.state}>Загрузка чатов…</p>
  }

  if (chatsQuery.isError) {
    return <p className={styles.state}>Не удалось загрузить чаты.</p>
  }

  if (chatsQuery.data.length === 0) {
    return <p className={styles.state}>Чатов пока нет.</p>
  }

  const filteredChats = chatsQuery.data.filter((chat) => {
    if (filter === 'all') {
      return true
    }

    const isGroup = chat.participantIds.length > 2
    return filter === 'group' ? isGroup : !isGroup
  })

  return (
    <div className={styles.root}>
      <div className={styles.tabs} role="tablist" aria-label="Тип чата">
        <button
          className={`${styles.tab} ${filter === 'all' ? styles.activeTab : ''}`}
          type="button"
          role="tab"
          aria-selected={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={`${styles.tab} ${filter === 'group' ? styles.activeTab : ''}`}
          type="button"
          role="tab"
          aria-selected={filter === 'group'}
          onClick={() => setFilter('group')}
        >
          Групповые
        </button>
        <button
          className={`${styles.tab} ${filter === 'personal' ? styles.activeTab : ''}`}
          type="button"
          role="tab"
          aria-selected={filter === 'personal'}
          onClick={() => setFilter('personal')}
        >
          Личные
        </button>
      </div>

      <nav className={styles.navigation} aria-label="Список чатов">
        {filteredChats.length === 0 ? (
          <p className={styles.state}>Чатов в этой категории пока нет.</p>
        ) : (
          <ul className={styles.list}>
            {filteredChats.map((chat) => (
              <li className={styles.item} key={chat.id}>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`.trim()
                  }
                  to={`/chats/${chat.id}`}
                >
                  <span className={styles.avatar} aria-hidden="true">
                    {chat.title.slice(0, 1).toUpperCase()}
                  </span>
                  <span className={styles.chatInfo}>
                    <span className={styles.title}>{chat.title}</span>
                    <span className={styles.preview}>
                      {chat.lastMessage?.text ?? 'Напишите сообщение первым!'}
                    </span>
                  </span>
                  <span className={styles.meta}>
                    <time dateTime={chat.updatedAt}>
                      {formatChatTime(chat.updatedAt)}
                    </time>
                    {chat.unreadCount > 0 && (
                      <span className={styles.unread} aria-label="Непрочитано">
                        {chat.unreadCount}
                      </span>
                    )}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  )
}
