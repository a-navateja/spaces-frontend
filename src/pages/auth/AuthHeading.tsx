export function AuthHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-7">
      <h1 className="text-[28px]">{title}</h1>
      <p className="mt-2 text-muted text-[14.5px]">{subtitle}</p>
    </div>
  );
}
