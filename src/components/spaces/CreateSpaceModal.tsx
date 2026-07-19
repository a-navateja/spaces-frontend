import { useState, type FormEvent } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { spacesApi } from "../../api/spaces";
import { ApiError } from "../../api/client";
import type { SpaceListItem } from "../../types/spaces";

interface CreateSpaceModalProps {
  onClose: () => void;
  onCreated: (space: SpaceListItem, creatorEmail: string) => void;
  creatorEmail: string;
}

export function CreateSpaceModal({ onClose, onCreated, creatorEmail }: CreateSpaceModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Give the space a name.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await spacesApi.create({
        name: name.trim(),
        description: description.trim() || undefined,
        is_public: isPublic,
      });
      onCreated(
        {
          id: res.space_id,
          name: res.name,
          description: description.trim() || null,
          is_public: isPublic,
          creator_email: creatorEmail,
        },
        creatorEmail,
      );
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't create the space.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Create a space" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Name"
          placeholder="e.g. Zoning & Land Use Archive"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error ?? undefined}
          autoFocus
        />
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[13px] font-semibold text-body" htmlFor="space-description">
            Description
          </label>
          <textarea
            id="space-description"
            className="h-[84px] py-2.5 px-3.5 resize-y rounded-sm border border-paper-line bg-white text-sm text-body placeholder:text-muted [transition:border-color_0.15s_ease,box-shadow_0.15s_ease] focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(106,90,168,0.15)]"
            placeholder="What kind of documents will live here?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2.5 text-[13.5px]">
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
          Make this space public to anyone with access to the app
        </label>
        <Button type="submit" fullWidth isLoading={isLoading}>
          Create space
        </Button>
      </form>
    </Modal>
  );
}
