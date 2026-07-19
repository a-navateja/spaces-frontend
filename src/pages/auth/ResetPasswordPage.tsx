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

export function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { notify } = useToast();

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const issue = passwordIssue(password);
    setError(issue);
    if (issue || !token) return;

    setIsLoading(true);
    try {
      await authApi.completePasswordReset(token, password);
      notify("Password updated — sign in with your new password.");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeading title="Choose a new password" subtitle="Make it something you haven't used before." />
      <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit} noValidate>
        <Input
          label="New password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error ?? undefined}
          autoComplete="new-password"
        />
        <Button type="submit" fullWidth isLoading={isLoading}>
          Update password
        </Button>
      </form>
    </AuthLayout>
  );
}
