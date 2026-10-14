import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUiStore } from "../../shared/model/uiStore";
import { ChatList } from "../../widgets/ChatList/ChatList";
import { ChatWindow } from "../../widgets/ChatWindow/ChatWindow";
import styles from "./ChatsPage.module.scss";

export function ChatsPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const { closeChatList, isChatListOpen, openChatList } = useUiStore();

  useEffect(() => {
    if (chatId) {
      closeChatList();
    }
  }, [chatId, closeChatList]);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Чаты</h1>

      <div className={styles.workspace}>
        <aside
          className={styles.chatList}
          data-open={isChatListOpen}
          aria-label="Чаты"
        >
          <ChatList />
        </aside>

        <section className={styles.chatContent}>
          {chatId && (
            <button
              className={styles.backButton}
              type="button"
              onClick={openChatList}
            >
              К списку чатов
            </button>
          )}
          <ChatWindow chatId={chatId} />
        </section>
      </div>
    </div>
  );
}
