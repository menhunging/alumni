import { zodResolver } from "@hookform/resolvers/zod";
import { type FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  InvalidCredentialsError,
  InvalidLoginCodeError,
} from "../../entities/auth/api/authRepository";
import {
  useLoginWithCode,
  useRequestLoginCode,
} from "../../entities/auth/api/mutations";
import { Button } from "../../shared/ui/Button/Button";
import { Input } from "../../shared/ui/Input/Input";
import styles from "./LoginForm.module.scss";

const codeLoginSchema = z.object({
  login: z.string().trim().min(1, "Введите логин"),
  code: z.string().regex(/^\d{6}$/, "Введите код из 6 цифр"),
});

type CodeLoginFormValues = z.infer<typeof codeLoginSchema>;

interface CodeLoginFormProps {
  onSuccess: () => void;
  onPasswordLoginClick: () => void;
}

export function CodeLoginForm({
  onSuccess,
  onPasswordLoginClick,
}: CodeLoginFormProps) {
  const [isCodeRequested, setIsCodeRequested] = useState(false);
  const requestCodeMutation = useRequestLoginCode();
  const loginMutation = useLoginWithCode();
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setFocus,
    trigger,
  } = useForm<CodeLoginFormValues>({
    resolver: zodResolver(codeLoginSchema),
    defaultValues: {
      login: "",
      code: "",
    },
  });

  const handleRequestCode = async () => {
    const isLoginValid = await trigger("login");

    if (!isLoginValid) {
      return;
    }

    requestCodeMutation.mutate(
      { login: getValues("login").trim() },
      {
        onSuccess: () => {
          setIsCodeRequested(true);
          window.setTimeout(() => setFocus("code"));
        },
      },
    );
  };

  const onSubmit = handleSubmit(({ login, code }) => {
    loginMutation.mutate(
      {
        login: login.trim(),
        code,
      },
      { onSuccess },
    );
  });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!isCodeRequested) {
      event.preventDefault();
      void handleRequestCode();
      return;
    }

    void onSubmit(event);
  };

  return (
    <form className={styles.root} onSubmit={handleFormSubmit}>
      {!isCodeRequested && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="code-login">
            Логин
          </label>
          <Input
            id="code-login"
            className={styles.input}
            autoComplete="username"
            aria-invalid={Boolean(errors.login)}
            {...register("login")}
          />
          {errors.login && (
            <p className={styles.error} role="alert">
              {errors.login.message}
            </p>
          )}
        </div>
      )}

      {requestCodeMutation.isError && (
        <p className={styles.error} role="alert">
          {requestCodeMutation.error instanceof InvalidCredentialsError
            ? "Пользователь с таким логином не найден"
            : "Не удалось отправить код"}
        </p>
      )}

      {!isCodeRequested && (
        <button
          className={`${styles.methodSwitch} link`}
          type="button"
          onClick={onPasswordLoginClick}
        >
          Войти по паролю
        </button>
      )}

      {!isCodeRequested ? (
        <Button
          className={styles.submit}
          type="submit"
          disabled={requestCodeMutation.isPending}
        >
          {requestCodeMutation.isPending ? "Отправка…" : "Далее"}
        </Button>
      ) : (
        <>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-code">
              Код из email
            </label>
            <Input
              id="login-code"
              className={styles.input}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              aria-invalid={Boolean(errors.code)}
              {...register("code")}
            />
            {errors.code && (
              <p className={styles.error} role="alert">
                {errors.code.message}
              </p>
            )}
          </div>

          {loginMutation.isError && (
            <p className={styles.error} role="alert">
              {loginMutation.error instanceof InvalidLoginCodeError
                ? "Неверный код"
                : "Не удалось выполнить вход"}
            </p>
          )}

          <button
            className={`${styles.methodSwitch} link`}
            type="button"
            disabled={requestCodeMutation.isPending}
            onClick={handleRequestCode}
          >
            {requestCodeMutation.isPending
              ? "Отправка…"
              : "Отправить код повторно"}
          </button>

          <Button
            className={styles.submit}
            type="submit"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Вход…" : "Войти"}
          </Button>
        </>
      )}
    </form>
  );
}
