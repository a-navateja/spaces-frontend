import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { AuthHeading } from "./AuthHeading";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { authApi } from "../../api/auth";
import { ApiError } from "../../api/client";
import { passwordIssue } from "../../utils/validators";
import { ROUTES } from "../../constants/routes";
import { useToast } from "../../hooks/useToast";

export function SignupConfirmPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { notify } = useToast();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const issue = passwordIssue(password);
    setError(issue);
    setConfirmError(password !== confirm ? "Passwords don't match." : null);
    if (issue || password !== confirm || !token) return;

    setIsLoading(true);
    try {
      await authApi.completeSignup(token, password);
      notify("Account created — sign in to continue.");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeading
        title="Set your password"
        subtitle="Almost there — choose a password to finish creating your account."
      />
      <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit} noValidate>
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error ?? undefined}
          autoComplete="new-password"
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={confirmError ?? undefined}
          autoComplete="new-password"
        />
        <Button type="submit" fullWidth isLoading={isLoading}>
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
}
