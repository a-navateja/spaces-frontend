import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const BASE =
  "relative inline-flex items-center justify-center gap-2 h-11 px-5 rounded-sm border border-transparent " +
  "text-sm font-semibold cursor-pointer active:translate-y-px disabled:opacity-[0.55] disabled:cursor-not-allowed " +
  "[transition:transform_0.12s_ease,background_0.15s_ease,border-color_0.15s_ease,opacity_0.15s_ease]";

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-ink-900 text-on-ink enabled:hover:bg-ink-800",
  secondary: "bg-paper text-body border-paper-line enabled:hover:border-violet-500",
  ghost: "bg-transparent text-muted enabled:hover:text-body enabled:hover:bg-paper-dim",
  danger: "bg-danger-soft text-danger enabled:hover:bg-[#f6d7d2]",
};

export function Button({
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  disabled,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${BASE} ${VARIANTS[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span
          className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-[spin_0.6s_linear_infinite]"
          aria-hidden
        />
      ) : null}
      <span className={isLoading ? "opacity-[0.85]" : undefined}>{children}</span>
    </button>
  );
}
