import { useEffect, useState } from "react";
import { spacesApi } from "../api/spaces";
import { ApiError } from "../api/client";
import type { SpaceListItem } from "../types/spaces";
import { SpaceCard } from "../components/spaces/SpaceCard";
import { CreateSpaceModal } from "../components/spaces/CreateSpaceModal";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { EmptyState } from "../components/ui/EmptyState";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

export function SpacesListPage() {
  const { session } = useAuth();
  const { notify } = useToast();
  const [spaces, setSpaces] = useState<SpaceListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    let cancelled = false;
    spacesApi
      .listAccessible()
      .then((res) => {
        if (!cancelled) setSpaces(res.spaces);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Couldn't load spaces.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="flex items-start justify-between gap-5 mb-8">
        <div>
          <h1 className="text-[26px]">Your spaces</h1>
          <p className="mt-1.5 text-muted text-sm">Everywhere your documents live, ready to be asked a question.</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ New space</Button>
      </div>

      {spaces === null && !error ? (
        <Spinner label="Loading your spaces…" />
      ) : error ? (
        <EmptyState title="Couldn't load spaces" description={error} />
      ) : spaces === null ? null : spaces.length === 0 ? (
        <EmptyState
          title="No spaces yet"
          description="Create your first space, add your content, invite people and start asking it questions."
          action={<Button onClick={() => setShowCreate(true)}>Create your first space</Button>}
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-[18px]">
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      )}

      {showCreate && session ? (
        <CreateSpaceModal
          creatorEmail={session.email}
          onClose={() => setShowCreate(false)}
          onCreated={(space) => {
            setSpaces((prev) => [space, ...(prev ?? [])]);
            notify(`"${space.name}" created.`);
          }}
        />
      ) : null}
    </div>
  );
}
