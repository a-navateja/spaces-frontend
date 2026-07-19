import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-2.5 py-14 px-6 text-muted">
      <div
        className="w-10 h-10 rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--color-violet-300),var(--color-violet-500))]"
        aria-hidden
      />
      <h3 className="text-[17px] text-body">{title}</h3>
      {description ? <p className="text-[13.5px] max-w-[320px]">{description}</p> : null}
      {action}
    </div>
  );
}
