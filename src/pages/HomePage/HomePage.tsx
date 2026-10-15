import { useCurrentUser } from "../../entities/auth/api/queries";
import styles from "./HomePage.module.scss";

export function HomePage() {
  const { data: user } = useCurrentUser();
  const userName = user?.name;

  return (
    <section className={styles.section}>
      <span className={styles.title}>
        Добро пожаловать{userName ? `, ${userName}` : ""}!
      </span>

      <section className={styles.left}>
        <div className={styles.events}>
          <header className={styles.eventsHeader}>
            <h2 className={styles.eventsTitle}>Ближайшие мероприятия</h2>
            <a className={styles.allEventsLink} href="/events">
              Смотреть все мероприятия
              <span aria-hidden="true">→</span>
            </a>
          </header>

          <div className={styles.eventsGrid}>
            <article className={styles.eventCard}>
              <div className={styles.eventImage}>
                <time className={styles.eventDate} dateTime="2026-06-03">
                  <strong>3</strong>
                  <span>июня</span>
                </time>
                <span className={`${styles.eventFormat} ${styles.online}`}>
                  Онлайн
                </span>
              </div>
              <h3 className={styles.eventTitle}>
                Мастер-класс: AI в продуктах
              </h3>
              <p className={styles.eventTime}>
                Среда, 3 июня 2026, 18:00 - 20:00 (МСК)
              </p>
              <p className={styles.eventPlace}>Москва, коворкинг</p>
              <button className={styles.registerButton} type="button">
                Зарегистрироваться
              </button>
            </article>

            <article className={styles.eventCard}>
              <div className={styles.eventImage}>
                <time className={styles.eventDate} dateTime="2026-06-05">
                  <strong>5</strong>
                  <span>июня</span>
                </time>
                <span className={`${styles.eventFormat} ${styles.offline}`}>
                  Офлайн
                </span>
              </div>
              <h3 className={styles.eventTitle}>UX дизайн и его особенности</h3>
              <p className={styles.eventTime}>
                Среда, 3 июня 2026, 18:00 - 20:00 (МСК)
              </p>
              <p className={styles.eventPlace}>Москва, коворкинг</p>
              <button className={styles.registerButton} type="button">
                Зарегистрироваться
              </button>
            </article>

            <article className={styles.eventCard}>
              <div className={styles.eventImage}>
                <time className={styles.eventDate} dateTime="2026-06-05">
                  <strong>5</strong>
                  <span>июня</span>
                </time>
                <span className={`${styles.eventFormat} ${styles.offline}`}>
                  Офлайн
                </span>
              </div>
              <h3 className={styles.eventTitle}>Цветовые тренды в дизайне</h3>
              <p className={styles.eventTime}>
                Среда, 3 июня 2026, 18:00 - 20:00 (МСК)
              </p>
              <p className={styles.eventPlace}>Москва, коворкинг</p>
              <button className={styles.registerButton} type="button">
                Зарегистрироваться
              </button>
            </article>
          </div>
        </div>

        <div className={styles.notifications}>
          <header className={styles.notificationsHeader}>
            <h2 className={styles.notificationsTitle}>Уведомления</h2>
            <a className={styles.allNotificationsLink} href="/notifications">
              Смотреть все уведомления
              <span aria-hidden="true">→</span>
            </a>
          </header>

          <div className={styles.notificationsList}>
            <article className={styles.notification}>
              <div className={styles.notificationImage} aria-hidden="true" />
              <div className={styles.notificationContent}>
                <h3 className={styles.notificationTitle}>Максим Смирнов</h3>
                <p className={styles.notificationText}>
                  отправил вам сообщение
                </p>
                <time className={styles.notificationTime}>10 мин. назад</time>
              </div>
              <button className={styles.notificationButton} type="button">
                В чат
              </button>
            </article>

            <article className={styles.notification}>
              <div className={styles.notificationImage} aria-hidden="true" />
              <div className={styles.notificationContent}>
                <h3 className={styles.notificationTitle}>
                  Вы приглашены на событие: “Онлайн трансформация бизнеса”
                </h3>
                <time className={styles.notificationTime}>1 час назад</time>
              </div>
              <button className={styles.notificationButton} type="button">
                К мероприятию
              </button>
            </article>

            <article className={styles.notification}>
              <div className={styles.notificationImage} aria-hidden="true" />
              <div className={styles.notificationContent}>
                <h3 className={styles.notificationTitle}>Мария Соколова</h3>
                <p className={styles.notificationText}>
                  приняла запрос в сообщество “AI Tech”
                </p>
                <time className={styles.notificationTime}>1 день назад</time>
              </div>
              <button className={styles.notificationButton} type="button">
                В группу
              </button>
            </article>

            <article className={styles.notification}>
              <div className={styles.notificationImage} aria-hidden="true" />
              <div className={styles.notificationContent}>
                <h3 className={styles.notificationTitle}>
                  Подтверждение регистрации на мероприятие “AI для бизнеса”
                </h3>
                <time className={styles.notificationTime}>8 часов назад</time>
              </div>
              <button className={styles.notificationButton} type="button">
                К мероприятию
              </button>
            </article>
          </div>
        </div>
      </section>
      <section className={styles.right}>
        <div className={styles.myEvents}>
          <h2 className={styles.myEventsTitle}>Мои мероприятия</h2>

          <div className={styles.myEventsList}>
            <article className={styles.myEvent}>
              <time className={styles.myEventDate} dateTime="2025-06-05">
                <strong>5</strong>
                <span>июня</span>
              </time>
              <div className={styles.myEventContent}>
                <h3 className={styles.myEventTitle}>
                  Digital-трансформация бизнеса
                </h3>
                <p className={styles.myEventMeta}>Онлайн, 6.05.2025 16:00</p>
                <span
                  className={`${styles.myEventStatus} ${styles.registered}`}
                >
                  Вы зарегистрированы
                </span>
              </div>
            </article>

            <article className={styles.myEvent}>
              <time className={styles.myEventDate} dateTime="2025-06-06">
                <strong>6</strong>
                <span>июня</span>
              </time>
              <div className={styles.myEventContent}>
                <h3 className={styles.myEventTitle}>
                  Нетворкинг встреча выпускников
                </h3>
                <p className={styles.myEventMeta}>Онлайн, 6.05.2025 16:00</p>
                <span
                  className={`${styles.myEventStatus} ${styles.registered}`}
                >
                  Вы зарегистрированы
                </span>
              </div>
            </article>

            <article className={styles.myEvent}>
              <time className={styles.myEventDate} dateTime="2025-06-16">
                <strong>16</strong>
                <span>июня</span>
              </time>
              <div className={styles.myEventContent}>
                <h3 className={styles.myEventTitle}>
                  AI в повседневной работе
                </h3>
                <p className={styles.myEventMeta}>Офлайн, 16.05.2025 16:00</p>
                <span className={`${styles.myEventStatus} ${styles.pending}`}>
                  Ожидает подтверждения
                </span>
              </div>
            </article>

            <article className={styles.myEvent}>
              <time className={styles.myEventDate} dateTime="2025-07-01">
                <strong>1</strong>
                <span>июля</span>
              </time>
              <div className={styles.myEventContent}>
                <h3 className={styles.myEventTitle}>
                  Нетворкинг встреча выпускников
                </h3>
                <p className={styles.myEventMeta}>Онлайн, 6.05.2025 16:00</p>
                <span
                  className={`${styles.myEventStatus} ${styles.registered}`}
                >
                  Вы зарегистрированы
                </span>
              </div>
            </article>

            <article className={styles.myEvent}>
              <time className={styles.myEventDate} dateTime="2025-07-10">
                <strong>10</strong>
                <span>июля</span>
              </time>
              <div className={styles.myEventContent}>
                <h3 className={styles.myEventTitle}>
                  AI в повседневной работе
                </h3>
                <p className={styles.myEventMeta}>Офлайн, 16.05.2025 16:00</p>
                <span className={`${styles.myEventStatus} ${styles.pending}`}>
                  Ожидает подтверждения
                </span>
              </div>
            </article>

            <article className={styles.myEvent}>
              <time className={styles.myEventDate} dateTime="2025-07-25">
                <strong>25</strong>
                <span>июля</span>
              </time>
              <div className={styles.myEventContent}>
                <h3 className={styles.myEventTitle}>
                  Нетворкинг встреча выпускников
                </h3>
                <p className={styles.myEventMeta}>Онлайн, 6.05.2025 16:00</p>
                <span
                  className={`${styles.myEventStatus} ${styles.registered}`}
                >
                  Вы зарегистрированы
                </span>
              </div>
            </article>
          </div>

          <a className={styles.allMyEventsLink} href="/events">
            Все мои мероприятия
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </section>
  );
}
