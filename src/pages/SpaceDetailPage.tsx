import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { spacesApi } from "../api/spaces";
import { ApiError } from "../api/client";
import type { SpaceListItem } from "../types/spaces";
import { ChatBox } from "../components/spaces/ChatBox";
import { UploadDocumentModal } from "../components/spaces/UploadDocumentModal";
import { AddMemberModal } from "../components/spaces/AddMemberModal";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { EmptyState } from "../components/ui/EmptyState";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { ROUTES } from "../constants/routes";

interface RecentUpload {
  filename: string;
  totalChunks: number;
}

export function SpaceDetailPage() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { session } = useAuth();
  const { notify } = useToast();

  const [space, setSpace] = useState<SpaceListItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
  const [addedMembers, setAddedMembers] = useState<string[]>([]);

  useEffect(() => {
    if (!spaceId) return;
    let cancelled = false;
    // NOTE: there's no GET /spaces/{id} yet, so the detail view is resolved
    // from the accessible-spaces list. Swap this for a direct fetch once that
    // endpoint exists.
    spacesApi
      .listAccessible()
      .then((res) => {
        if (cancelled) return;
        const match = res.spaces.find((s) => s.id === spaceId);
        setSpace(match ?? null);
        if (!match) setError("You don't have access to this space, or it doesn't exist.");
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Couldn't load this space.");
      });
    return () => {
      cancelled = true;
    };
  }, [spaceId]);

  if (!spaceId) return null;

  if (!space && !error) return <Spinner label="Loading space…" />;
  if (!space) return <EmptyState title="Space unavailable" description={error ?? undefined} />;

  const isCreator = session?.email?.toLowerCase() === space.creator_email?.toLowerCase();

  return (
    <div>
      <Link to={ROUTES.SPACES} className="inline-block text-[13px] text-muted no-underline mb-5 hover:text-body">
        ← All spaces
      </Link>

      <div className="grid grid-cols-[300px_1fr] gap-6 h-[calc(100vh-160px)] min-h-0 max-[900px]:grid-cols-1 max-[900px]:h-auto">
        <aside className="bg-white border border-paper-line rounded-md p-6 flex flex-col gap-3.5 h-full overflow-y-auto">
          <span
            className="w-[38px] h-[38px] rounded-[11px] bg-[linear-gradient(135deg,var(--color-ink-800),var(--color-violet-500))]"
            aria-hidden
          />
          <h1 className="text-[21px]">{space.name}</h1>
          <p className="text-[13.5px] text-muted leading-[1.55]">{space.description || "No description yet."}</p>

          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className={`text-[11px] font-semibold py-[3px] px-[9px] rounded-full font-mono ${
                space.is_public ? "bg-success-soft text-success" : "bg-paper-dim text-muted"
              }`}
            >
              {space.is_public ? "Public" : "Private"}
            </span>
            <span className="text-[11.5px] text-muted font-mono">Created by {isCreator ? "You" : space.creator_email}</span>
          </div>

          {isCreator ? (
            <div className="flex flex-col gap-2 mt-1">
              <Button variant="secondary" fullWidth onClick={() => setShowUpload(true)}>
                Upload document
              </Button>
              <Button variant="ghost" fullWidth onClick={() => setShowAddMember(true)}>
                Add member
              </Button>
            </div>
          ) : (
            <p className="text-[12.5px] text-muted bg-paper py-2.5 px-3 rounded-sm">
              Only the creator can upload documents or add members here.
            </p>
          )}

          {recentUploads.length > 0 ? (
            <div className="border-t border-paper-line pt-3.5">
              <h4 className="text-xs uppercase [letter-spacing:0.04em] text-muted mb-2 font-semibold">
                Indexed this session
              </h4>
              <ul className="list-none m-0 p-0 flex flex-col gap-1.5 text-[13px]">
                {recentUploads.map((u, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 break-all">
                    <span>{u.filename}</span>
                    <span className="font-mono text-[11px] text-muted whitespace-nowrap">{u.totalChunks} chunks</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {addedMembers.length > 0 ? (
            <div className="border-t border-paper-line pt-3.5">
              <h4 className="text-xs uppercase [letter-spacing:0.04em] text-muted mb-2 font-semibold">
                Added to this Space
              </h4>
              <ul className="list-none m-0 p-0 flex flex-col gap-1.5 text-[13px]">
                {addedMembers.map((email, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 break-all">
                    {email}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>

        <section className="h-full min-h-0 max-[900px]:h-[60vh]">
          <ChatBox spaceId={space.id} />
        </section>
      </div>

      {showUpload ? (
        <UploadDocumentModal
          spaceId={space.id}
          onClose={() => setShowUpload(false)}
          onUploaded={(res) => {
            setRecentUploads((prev) => [{ filename: res.filename, totalChunks: res.total_chunks }, ...prev]);
            notify(`${res.filename} indexed — ${res.total_chunks} chunks.`);
          }}
        />
      ) : null}

      {showAddMember ? (
        <AddMemberModal
          spaceId={space.id}
          onClose={() => setShowAddMember(false)}
          onAdded={(email) => {
            setAddedMembers((prev) => [email, ...prev]);
            notify(`${email} can now access this space.`);
          }}
        />
      ) : null}
    </div>
  );
}
