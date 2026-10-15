import { zodResolver } from "@hookform/resolvers/zod";
import { type FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../shared/ui/Button/Button";
import { Input } from "../../shared/ui/Input/Input";
import styles from "./LoginForm.module.scss";

const codeLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Введите email")
    .pipe(z.email("Введите корректный email")),
  code: z.string().regex(/^\d{6}$/, "Введите код из 6 цифр"),
});

type CodeLoginFormValues = z.infer<typeof codeLoginSchema>;

interface CodeLoginFormProps {
  onPasswordLoginClick: () => void;
}

export function CodeLoginForm({
  onPasswordLoginClick,
}: CodeLoginFormProps) {
  const [isCodeRequested, setIsCodeRequested] = useState(false);
  const [isEndpointUnavailable, setIsEndpointUnavailable] = useState(false);
  const {
    formState: { errors },
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

    setIsEndpointUnavailable(false);
    setIsCodeRequested(true);
    window.setTimeout(() => setFocus("code"));
  };

  const onSubmit = handleSubmit(() => {
    setIsEndpointUnavailable(true);
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

      {!isCodeRequested ? (
        <>
          <button
            className={`${styles.methodSwitch} link`}
            type="button"
            onClick={onPasswordLoginClick}
          >
            Войти по паролю
          </button>

          <Button className={styles.submit} type="submit">
            Далее
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

          {isEndpointUnavailable && (
            <p className={styles.error} role="alert">
              Вход по коду пока недоступен
            </p>
          )}

          <button
            className={`${styles.methodSwitch} link`}
            type="button"
            onClick={() => setIsEndpointUnavailable(true)}
          >
            Отправить код повторно
          </button>

          <Button className={styles.submit} type="submit">
            Войти
          </Button>
        </>
      )}
    </form>
  );
}
