import { useState, type FormEvent } from "react";
import { spacesApi } from "../../api/spaces";
import { ApiError } from "../../api/client";
import type { QaTurn } from "../../types/spaces";
import ReactMarkdown from "react-markdown";

export function ChatBox({ spaceId }: { spaceId: string }) {
  const [turns, setTurns] = useState<QaTurn[]>([]);
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const id = crypto.randomUUID();
    setTurns((prev) => [...prev, { id, query: trimmed, isLoading: true }]);
    setQuery("");

    try {
      const res = await spacesApi.search(spaceId, trimmed);
      setTurns((prev) => prev.map((t) => (t.id === id ? { ...t, answer: res.answer, isLoading: false } : t)));
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Couldn't get an answer.";
      setTurns((prev) => prev.map((t) => (t.id === id ? { ...t, error: message, isLoading: false } : t)));
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-white border border-paper-line rounded-md overflow-hidden">
      <div className="thin-scroll flex-1 min-h-0 overflow-y-auto p-6 flex flex-col gap-5">
        {turns.length === 0 ? (
          <div className="m-auto flex flex-col items-center gap-2.5 text-muted text-[13.5px] text-center max-w-[240px]">
            <span
              className="w-[34px] h-[34px] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--color-violet-300),var(--color-violet-500))]"
              aria-hidden
            />
            <p>Ask this space anything about the documents inside it.</p>
          </div>
        ) : (
          turns.map((turn) => (
            <div key={turn.id} className="flex flex-col gap-2.5">
              <div className="py-3 px-4 rounded-md text-sm leading-[1.55] max-w-[85%] self-end bg-ink-900 text-on-ink rounded-br-[4px]">
                {turn.query}
              </div>
              <div className="py-3 px-4 rounded-md text-sm leading-[1.55] max-w-[85%] self-start bg-paper border border-paper-line rounded-bl-[4px] whitespace-pre-wrap">
                {turn.isLoading ? (
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-think" />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-think [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-think [animation-delay:0.3s]" />
                  </span>
                ) : turn.error ? (
                  <span className="text-danger">{turn.error}</span>
                ) : (
                  <div className="prose prose-sm max-w-none prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1">
                    <ReactMarkdown>{turn.answer ?? ""}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <form className="flex-shrink-0 flex gap-2.5 p-3.5 border-t border-paper-line bg-white" onSubmit={handleSubmit}>
        <input
          className="flex-1 h-11 px-4 rounded-sm border border-paper-line text-sm focus:border-violet-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(106,90,168,0.15)]"
          placeholder="Ask a question about this space's documents…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="w-11 h-11 rounded-sm border-none bg-ink-900 text-white text-[17px] cursor-pointer [transition:background_0.15s_ease,opacity_0.15s_ease] enabled:hover:bg-ink-800 disabled:opacity-40 disabled:cursor-not-allowed"
          type="submit"
          disabled={!query.trim()}
          aria-label="Send question"
        >
          →
        </button>
      </form>
    </div>
  );
}
