import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/routes";

export function AppLayout() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const initials = session?.email ? session.email[0].toUpperCase() : "?";

  return (
    <div className="min-h-screen grid grid-cols-[248px_1fr] max-[720px]:grid-cols-1">
      <aside className="bg-ink-950 text-on-ink flex flex-col py-6 px-[18px] max-[720px]:flex-row max-[720px]:items-center max-[720px]:py-3.5 max-[720px]:px-4">
        <div className="flex items-center gap-2.5 font-display text-lg font-semibold px-2 mb-8">
          <span
            className="w-[26px] h-[26px] rounded-lg bg-[linear-gradient(135deg,var(--color-accent),var(--color-violet-300))]"
            aria-hidden
          />
          Spaces
        </div>

        <nav className="flex flex-col gap-1 flex-1 max-[720px]:hidden">
          <Link
            className="flex items-center gap-2.5 py-2.5 px-3 rounded-sm text-on-ink-muted no-underline text-sm font-medium [transition:background_0.15s_ease,color_0.15s_ease] bg-[rgba(255,255,255,0.06)] text-on-ink hover:bg-[rgba(255,255,255,0.06)] hover:text-on-ink"
            to={ROUTES.SPACES}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
            Your spaces
          </Link>
        </nav>

        <div className="flex items-center gap-2.5 p-2.5 rounded-sm bg-[rgba(255,255,255,0.04)] max-[720px]:hidden">
          <div className="w-8 h-8 min-w-8 rounded-full flex items-center justify-center bg-[linear-gradient(135deg,var(--color-accent),var(--color-violet-300))] text-[13px] font-bold text-ink-950">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-[12.5px] font-semibold text-on-ink whitespace-nowrap overflow-hidden text-ellipsis"
              title={session?.email}
            >
              {session?.email}
            </p>
            <p className="text-[11px] text-on-ink-muted font-mono">{session?.role}</p>
          </div>
          <button
            className="bg-none border-none text-on-ink-muted cursor-pointer text-sm p-1.5 rounded-[6px] hover:text-on-ink hover:bg-[rgba(255,255,255,0.08)]"
            onClick={handleLogout}
            title="Log out"
          >
            ⏻
          </button>
        </div>
      </aside>

      <main className="overflow-y-auto py-10 px-12 max-[720px]:p-6">
        <Outlet />
      </main>
    </div>
  );
}
