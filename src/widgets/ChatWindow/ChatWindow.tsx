import { useChat, useMessages } from "../../entities/chat/api/queries";
import { currentUserId } from "../../entities/chat/api/mockData";
import type { ChatId } from "../../entities/chat/model/types";
import { MessageForm } from "../../features/SendMessage/MessageForm";
import styles from "./ChatWindow.module.scss";

interface ChatWindowProps {
  chatId?: ChatId;
}

export function ChatWindow({ chatId }: ChatWindowProps) {
  const chatQuery = useChat(chatId);
  const messagesQuery = useMessages(chatId);

  if (!chatId) {
    return <p className={styles.state}>Выберите чат.</p>;
  }

  if (chatQuery.isPending || messagesQuery.isPending) {
    return <p className={styles.state}>Загрузка переписки…</p>;
  }

  if (chatQuery.isError || messagesQuery.isError) {
    return <p className={styles.state}>Не удалось загрузить переписку.</p>;
  }

  if (!chatQuery.data) {
    return <p className={styles.state}>Чат не найден.</p>;
  }

  return (
    <section className={styles.root} aria-labelledby="chat-title">
      <header className={styles.header}>
        <span className={styles.avatar} aria-hidden="true">
          {chatQuery.data.title.slice(0, 1).toUpperCase()}
        </span>
        <h2 className={styles.title} id="chat-title">
          {chatQuery.data.title}
        </h2>
        <button
          className={styles.menuButton}
          type="button"
          aria-label="Меню чата"
        >
          •••
        </button>
      </header>

      <ol className={styles.messages} aria-label="Сообщения">
        {messagesQuery.data.length === 0 ? (
          <li className={styles.empty}>Напишите сообщение первым!</li>
        ) : (
          messagesQuery.data.map((message) => (
            <li
              className={styles.message}
              data-own={message.authorId === currentUserId}
              key={message.id}
            >
              <p className={styles.messageText}>{message.text}</p>
              <time
                className={styles.time}
                dateTime={message.createdAt}
                title={new Date(message.createdAt).toLocaleString("ru-RU")}
              >
                {new Date(message.createdAt).toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </li>
          ))
        )}
      </ol>

      <MessageForm chatId={chatId} />
    </section>
  );
}
