export function Spinner({ label }: { label?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-[60px] px-5 text-muted text-[13px]"
      role="status"
      aria-live="polite"
    >
      <span
        className="w-7 h-7 rounded-full border-[3px] border-paper-line [border-top-color:var(--color-violet-500)] animate-[spin_0.7s_linear_infinite]"
        aria-hidden
      />
      {label ? <p>{label}</p> : null}
    </div>
  );
}
