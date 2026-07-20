import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { AuthHeading } from "./AuthHeading";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { authApi } from "../../api/auth";
import { ApiError } from "../../api/client";
import { isValidEmail } from "../../utils/validators";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email) || password.length === 0) {
      setError("Enter a valid email and password.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const session = await authApi.login({ email: email.trim().toLowerCase(), password });
      console.log("Login successful:", session);
      setSession(session);
      navigate(ROUTES.SPACES);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeading title="Welcome back" subtitle="Sign in to keep working with your spaces" />
      <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit} noValidate>
        <Input
          label="Email address"
          type="email"
          placeholder="i.e. janedoe2025@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error ?? undefined}
            autoComplete="current-password"
          />
          <div className="text-right mt-2">
            <Link to={ROUTES.FORGOT_PASSWORD} className="text-[12.5px]">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type="submit" fullWidth isLoading={isLoading}>
          Log in
        </Button>
      </form>
      <p className="mt-[22px] text-center text-[13.5px] text-muted">
        New to Spaces?{" "}
        <Link to={ROUTES.SIGNUP} className="text-body font-semibold no-underline hover:text-accent-strong">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
