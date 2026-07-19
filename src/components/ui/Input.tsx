import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", ...rest }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor={inputId} className="text-[13px] font-semibold text-body">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`h-[46px] px-3.5 rounded-sm border bg-white text-sm text-body placeholder:text-muted [transition:border-color_0.15s_ease,box-shadow_0.15s_ease] focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(106,90,168,0.15)] ${
            error ? "border-danger" : "border-paper-line"
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-[12.5px] text-danger">
            {error}
          </p>
        ) : hint ? (
          <p className="text-[12.5px] text-muted">{hint}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
