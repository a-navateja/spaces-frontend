import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", type, ...rest }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor={inputId} className="text-[13px] font-semibold text-body">
          {label}
        </label>

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={`h-[46px] w-full rounded-sm border bg-white px-3.5 text-sm text-body placeholder:text-muted [transition:border-color_0.15s_ease,box-shadow_0.15s_ease] focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(106,90,168,0.15)] ${
              error ? "border-danger" : "border-paper-line"
            } ${isPassword ? "pr-11" : ""} ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-muted hover:text-body"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          )}
        </div>

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