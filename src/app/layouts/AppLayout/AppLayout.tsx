import { useQueryClient } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";
import chatsIcon from "../../../assets/icons/chats.svg";
import eventsIcon from "../../../assets/icons/events.svg";
import groupsIcon from "../../../assets/icons/groups.svg";
import homeIcon from "../../../assets/icons/home.svg";
import notificationsIcon from "../../../assets/icons/notifications.svg";
import settingsIcon from "../../../assets/icons/settings.svg";
import logo from "../../../assets/images/logo.svg";
import { useCurrentUser } from "../../../entities/auth/api/queries";
import { useAuthStore } from "../../../entities/auth/model/authStore";
import styles from "./AppLayout.module.scss";

const menuItems = [
  { to: "/", label: "Главная", icon: homeIcon },
  { to: "/chats", label: "Чаты", icon: chatsIcon },
  { to: "/groups", label: "Группы", icon: groupsIcon },
  { to: "/events", label: "Мероприятия", icon: eventsIcon },
  { to: "/members", label: "Участники", icon: null },
  {
    to: "/notifications",
    label: "Уведомления",
    icon: notificationsIcon,
  },
  { to: "/settings", label: "Настройки", icon: settingsIcon },
] as const;

export function AppLayout() {
  const { data: user } = useCurrentUser();
  const clearSession = useAuthStore((state) => state.clearSession);
  const queryClient = useQueryClient();
  const isProfileIncomplete = user?.profileCompleted === false;

  const handleLogout = () => {
    queryClient.clear();
    clearSession();
  };

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        <NavLink className={styles.logoLink} to="/" aria-label="Alumni">
          <img src={logo} alt="Alumni" />
        </NavLink>

        <nav
          className={`${styles.navigation} ${
            isProfileIncomplete ? styles.navigationDisabled : ""
          }`.trim()}
          aria-disabled={isProfileIncomplete || undefined}
          aria-label="Основная навигация"
        >
          {menuItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `${styles.menuLink} ${isActive ? styles.active : ""}`.trim()
              }
              aria-disabled={isProfileIncomplete || undefined}
              end={item.to === "/"}
              key={item.to}
              onClick={(event) => {
                if (isProfileIncomplete) {
                  event.preventDefault();
                }
              }}
              tabIndex={isProfileIncomplete ? -1 : undefined}
              to={item.to}
            >
              {item.icon ? (
                <img className={styles.menuIcon} src={item.icon} alt="" />
              ) : (
                <span className={styles.menuIcon} aria-hidden="true" />
              )}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <footer className={styles.sidebarFooter}>
          <button className={styles.supportButton} type="button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 13V11C4 6.58 7.58 3 12 3C16.42 3 20 6.58 20 11V13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M4 12H6C6.55 12 7 12.45 7 13V18C7 18.55 6.55 19 6 19H5C4.45 19 4 18.55 4 18V12Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M20 12H18C17.45 12 17 12.45 17 13V18C17 18.55 17.45 19 18 19H19C19.55 19 20 18.55 20 18V12Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            <span>Помощь и поддержка</span>
          </button>

          {isProfileIncomplete ? (
            <button
              className={styles.logoutButton}
              type="button"
              onClick={handleLogout}
            >
              Выйти
            </button>
          ) : (
            <details className={styles.accountMenu}>
              <summary className={styles.account}>
                <span className={styles.accountAvatar} aria-hidden="true">
                  {(user?.name.slice(0, 1).toUpperCase() ||
                    user?.login.slice(0, 1).toUpperCase()) ??
                    "П"}
                </span>
                <span className={styles.accountInfo}>
                  <strong>
                    {user
                      ? `${user.name} ${user.surname.slice(0, 1).toUpperCase()}`.trim() ||
                        user?.login.trim()
                      : "Пользователь"}
                  </strong>
                  <span>Участник</span>
                </span>
                <svg
                  className={styles.accountArrow}
                  width="10"
                  height="18"
                  viewBox="0 0 10 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L9 9L1 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className={styles.accountActions}>
                <NavLink to="/settings">Настройки профиля</NavLink>
                <button type="button" onClick={handleLogout}>
                  Выйти
                </button>
              </div>
            </details>
          )}
        </footer>
      </aside>

      <section className={styles.content} aria-live="polite">
        <Outlet />
      </section>
    </main>
  );
}
