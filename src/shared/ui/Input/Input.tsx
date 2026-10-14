import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", "aria-invalid": ariaInvalid, ...props }, ref) => {
    const isInvalid = ariaInvalid === true || ariaInvalid === "true";

    return (
      <div className={styles.inputBlock} data-invalid={isInvalid}>
        <input
          ref={ref}
          className={`${styles.input} ${className}`.trim()}
          aria-invalid={ariaInvalid}
          {...props}
        />
        {isInvalid && (
          <svg
            className={styles.errorIcon}
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7.33317 4.6665V7.33317M7.33317 9.99984H7.33984M13.9998 7.33317C13.9998 11.0151 11.0151 13.9998 7.33317 13.9998C3.65127 13.9998 0.666504 11.0151 0.666504 7.33317C0.666504 3.65127 3.65127 0.666504 7.33317 0.666504C11.0151 0.666504 13.9998 3.65127 13.9998 7.33317Z"
              stroke="#F04438"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
