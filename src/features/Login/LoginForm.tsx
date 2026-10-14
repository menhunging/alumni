import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InvalidCredentialsError } from "../../entities/auth/api/authRepository";
import { useLogin } from "../../entities/auth/api/mutations";
import { Button } from "../../shared/ui/Button/Button";
import { Input } from "../../shared/ui/Input/Input";
import styles from "./LoginForm.module.scss";

const loginSchema = z.object({
  login: z.string().trim().min(1, "Введите логин"),
  password: z.string().min(1, "Введите пароль"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
  onCodeLoginClick: () => void;
}

export function LoginForm({ onSuccess, onCodeLoginClick }: LoginFormProps) {
  const loginMutation = useLogin();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((credentials) => {
    loginMutation.mutate(
      {
        ...credentials,
        login: credentials.login.trim(),
      },
      { onSuccess },
    );
  });

  const requestError =
    loginMutation.error instanceof InvalidCredentialsError
      ? "Неверный логин или пароль"
      : "Не удалось выполнить вход";

  return (
    <form className={styles.root} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="login">
          Email<span>*</span>
        </label>
        <Input
          id="login"
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

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          Пароль<span>*</span>
        </label>
        <Input
          id="password"
          className={styles.input}
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.error} role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      {loginMutation.isError && (
        <p className={styles.error} role="alert">
          {requestError}
        </p>
      )}

      <button
        className={`${styles.methodSwitch} link`}
        type="button"
        onClick={onCodeLoginClick}
      >
        Войти по коду
      </button>

      <Button
        className={styles.submit}
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Вход…" : "Далее"}
      </Button>
    </form>
  );
}
