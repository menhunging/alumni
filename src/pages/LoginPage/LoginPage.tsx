import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CodeLoginForm } from "../../features/Login/CodeLoginForm";
import { LoginForm } from "../../features/Login/LoginForm";
import styles from "./LoginPage.module.scss";

type LoginMethod = "password" | "code";

interface LoginLocationState {
  from?: string;
}

export function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("password");
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LoginLocationState | null;

  const handleSuccess = () => {
    const destination = state?.from?.startsWith("/") ? state.from : "/";

    navigate(destination, { replace: true });
  };

  return (
    <main className={styles.main}>
      <section className={styles.content} aria-labelledby="login-title">
        <h1 className={styles.title} id="login-title">
          Добро пожаловать в Alumni
        </h1>
        <div className={styles.description}>
          {loginMethod === "password" ? (
            <p>Введите email и пароль, указанные при регистрации.</p>
          ) : (
            <p>
              Введите email, который вы использовали при регистрации.
              <br />
              Мы пришлём код для подтверждения входа.
            </p>
          )}
        </div>

        {loginMethod === "password" ? (
          <LoginForm
            onSuccess={handleSuccess}
            onCodeLoginClick={() => setLoginMethod("code")}
          />
        ) : (
          <CodeLoginForm
            onSuccess={handleSuccess}
            onPasswordLoginClick={() => setLoginMethod("password")}
          />
        )}
      </section>
    </main>
  );
}
