import type { ReactNode } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-[rgba(20,21,43,0.45)] backdrop-blur-[2px] flex items-center justify-center p-5 z-[80] animate-overlay-in"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-[440px] bg-white rounded-lg shadow-lg animate-modal-in"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-paper-line">
          <h3 className="text-lg">{title}</h3>
          <button
            className="bg-none border-none text-[22px] leading-none text-muted cursor-pointer p-1 hover:text-body"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}
