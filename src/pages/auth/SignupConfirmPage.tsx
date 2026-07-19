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
        <div className="rounded-sm border border-paper-line bg-paper px-3 py-2.5 text-[12.5px] text-muted">
            <p className="mb-1 font-semibold text-body">Password requirements</p>
            <ul className="m-0 list-disc pl-4 space-y-1">
              <li>At least 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character</li>
            </ul>
          </div>
        <div className="flex flex-col gap-2">
          <Input
            label="Password"
            type="password"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error ?? undefined}
            autoComplete="new-password"
          />
          
        </div>
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
