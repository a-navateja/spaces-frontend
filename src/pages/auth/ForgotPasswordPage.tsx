import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { AuthHeading } from "./AuthHeading";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { authApi } from "../../api/auth";
import { ApiError } from "../../api/client";
import { isValidEmail } from "../../utils/validators";
import { ROUTES } from "../../constants/routes";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await authApi.requestPasswordReset({ email: email.trim().toLowerCase() });
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Link
        to={ROUTES.LOGIN}
        className="self-start inline-block text-[13px] text-muted no-underline mb-1 hover:text-body"
      >
        ← Back to login
      </Link>
      {sent ? (
        <>
          <AuthHeading title="Check your inbox" subtitle="We sent a link to reset your password." />
          <div className="flex flex-col items-start gap-3.5 p-[18px] bg-success-soft rounded-md text-success text-sm">
            A reset link is on its way to <strong>{email}</strong>.
          </div>
        </>
      ) : (
        <>
          <AuthHeading title="Reset your password" subtitle="Enter your email and we'll send you a reset link." />
          <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit} noValidate>
            <Input
              label="Email address"
              type="email"
              placeholder="i.e. janedoe2025@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error ?? undefined}
              autoComplete="email"
            />
            <Button type="submit" fullWidth isLoading={isLoading}>
              Send reset link
            </Button>
          </form>
        </>
      )}
    </AuthLayout>
  );
}
