import { zodResolver } from "@hookform/resolvers/zod";
import { type SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useLoginWithCode,
  useRequestLoginCode,
} from "../../entities/auth/api/mutations";
import type { PendingCodeLogin } from "../../entities/auth/model/types";
import { Button } from "../../shared/ui/Button/Button";
import { Input } from "../../shared/ui/Input/Input";
import styles from "./LoginForm.module.scss";

const codeLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Введите email")
    .pipe(z.email("Введите корректный email")),
  code: z.string().regex(/^\d{4}$/, "Введите код из 4 цифр"),
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
  const [pendingLogin, setPendingLogin] = useState<PendingCodeLogin | null>(
    null,
  );
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
      email: "",
      code: "",
    },
  });

  const handleRequestCode = async () => {
    if (!(await trigger("email"))) {
      return;
    }

    requestCodeMutation.mutate(
      { email: getValues("email").trim() },
      {
        onSuccess: (result) => {
          setPendingLogin(result);
          setIsCodeRequested(true);
          window.setTimeout(() => setFocus("code"));
        },
      },
    );
  };

  const onSubmit = handleSubmit(({ code }) => {
    if (!pendingLogin) {
      return;
    }

    loginMutation.mutate(
      {
        ...pendingLogin,
        code,
      },
      { onSuccess },
    );
  });

  const handleFormSubmit = (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
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
          <label className={styles.label} htmlFor="code-email">
            Email<span>*</span>
          </label>
          <Input
            id="code-email"
            className={styles.input}
            type="email"
            autoComplete="username"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.error} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      )}

      {requestCodeMutation.isError && (
        <p className={styles.error} role="alert">
          {requestCodeMutation.error instanceof Error
            ? requestCodeMutation.error.message
            : "Не удалось отправить код"}
        </p>
      )}

      {!isCodeRequested ? (
        <>
          <button
            className={`${styles.methodSwitch} link`}
            type="button"
            onClick={onPasswordLoginClick}
          >
            Войти по паролю
          </button>

          <Button
            className={styles.submit}
            type="submit"
            disabled={requestCodeMutation.isPending}
          >
            {requestCodeMutation.isPending ? "Отправка…" : "Далее"}
          </Button>
        </>
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
              maxLength={4}
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
              {loginMutation.error instanceof Error
                ? loginMutation.error.message
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
