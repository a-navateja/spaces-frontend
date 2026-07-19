import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";

export type ToastKind = "success" | "error";
interface Toast {
  id: string;
  kind: ToastKind;
  message: string;
}

interface ToastContextValue {
  notify: (message: string, kind?: ToastKind) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const TOAST_KIND_CLASSES: Record<ToastKind, string> = {
  success: "bg-success-soft text-success border border-[rgba(63,143,108,0.25)]",
  error: "bg-danger-soft text-danger border border-[rgba(194,75,63,0.25)]",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, kind: ToastKind = "success") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, kind, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2.5 z-[100]" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`py-3 px-4 rounded-sm text-sm shadow-md animate-toast-in max-w-[320px] ${TOAST_KIND_CLASSES[t.kind]}`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
