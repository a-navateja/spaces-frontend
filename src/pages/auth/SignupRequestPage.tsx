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

export function SignupRequestPage() {
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
      await authApi.requestVerificationLink(email.trim().toLowerCase());
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      {sent ? (
        <>
          <AuthHeading title="Check your inbox" subtitle="We sent a link to finish creating your account." />
          <div className="flex flex-col items-start gap-3.5 p-[18px] bg-success-soft rounded-md text-success text-sm">
            <span>
              A verification link is on its way to <strong>{email}</strong>. Open it to set your password.
            </span>
            <Button variant="secondary" onClick={() => setSent(false)}>
              Use a different email
            </Button>
          </div>
        </>
      ) : (
        <>
          <AuthHeading title="Sign up account" subtitle="Create an account for new users" />
          <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit} noValidate>
            <Input
              label="Enter your email address"
              type="email"
              placeholder="i.e. janedoe2025@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error ?? undefined}
              autoComplete="email"
            />
            <Button type="submit" fullWidth isLoading={isLoading}>
              Get started
            </Button>
            {/* <p className="text-center text-xs text-muted">
              By submitting, you agree to Spaces&rsquo;{" "}
              <a href="#" className="text-body font-semibold no-underline hover:text-accent-strong">
                Terms of Service
              </a>{" "}
              and Privacy Policy
            </p> */}
          </form>
          <p className="mt-[22px] text-center text-[13.5px] text-muted">
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="text-body font-semibold no-underline hover:text-accent-strong">
              Login
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  );
}
