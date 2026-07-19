import { Link } from "react-router-dom";
import type { SpaceListItem } from "../../types/spaces";
import { buildSpaceDetailPath } from "../../constants/routes";
import { storage } from "../../utils/storage";

export function SpaceCard({ space }: { space: SpaceListItem }) {
  const currentUserEmail = storage.getSession()?.email?.toLowerCase();
  const creatorEmail = space.creator_email?.toLowerCase();
  const label = currentUserEmail && creatorEmail && currentUserEmail === creatorEmail ? "You" : space.creator_email;

  return (
    <Link
      to={buildSpaceDetailPath(space.id)}
      className="flex flex-col gap-2.5 p-5 rounded-md bg-white border border-paper-line no-underline text-inherit [transition:transform_0.15s_ease,box-shadow_0.15s_ease,border-color_0.15s_ease] hover:-translate-y-0.5 hover:shadow-md hover:border-violet-300"
    >
      <div className="flex items-center justify-between">
        <span
          className="w-[30px] h-[30px] rounded-[9px] bg-[linear-gradient(135deg,var(--color-ink-800),var(--color-violet-500))]"
          aria-hidden
        />
        <span
          className={`text-[11px] font-semibold py-[3px] px-[9px] rounded-full font-mono ${
            space.is_public ? "bg-success-soft text-success" : "bg-paper-dim text-muted"
          }`}
        >
          {space.is_public ? "Public" : "Private"}
        </span>
      </div>
      <h3 className="text-[17px]">{space.name}</h3>
      <p className="text-[13.5px] text-muted leading-[1.5] line-clamp-2">
        {space.description || "No description yet."}
      </p>
      <p className="text-[11.5px] text-muted font-mono mt-auto">Created by {label}</p>
    </Link>
  );
}
