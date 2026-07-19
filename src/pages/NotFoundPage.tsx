import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center p-6">
      <h1 className="text-[40px]">404</h1>
      <p className="text-muted">This page doesn&rsquo;t exist.</p>
      <Link to={ROUTES.SPACES} className="font-semibold">
        Back to your spaces
      </Link>
    </div>
  );
}
