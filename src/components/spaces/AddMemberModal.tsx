import { useState, type FormEvent } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { spacesApi } from "../../api/spaces";
import { ApiError } from "../../api/client";
import { isValidEmail } from "../../utils/validators";

interface AddMemberModalProps {
  spaceId: string;
  onClose: () => void;
  onAdded: (email: string) => void;
}

export function AddMemberModal({ spaceId, onClose, onAdded }: AddMemberModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await spacesApi.addUser(spaceId, email.trim().toLowerCase());
      onAdded(res.added_user_email);
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't add that member.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Add a member" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Email address"
          type="email"
          placeholder="teammate@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error ?? undefined}
          autoFocus
        />
        <Button type="submit" fullWidth isLoading={isLoading}>
          Add to space
        </Button>
      </form>
    </Modal>
  );
}
