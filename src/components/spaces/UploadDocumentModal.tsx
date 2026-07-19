import { useRef, useState, type DragEvent } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { spacesApi } from "../../api/spaces";
import { ApiError } from "../../api/client";
import type { DocumentUploadResponse } from "../../types/spaces";

interface UploadDocumentModalProps {
  spaceId: string;
  onClose: () => void;
  onUploaded: (result: DocumentUploadResponse) => void;
}

export function UploadDocumentModal({ spaceId, onClose, onUploaded }: UploadDocumentModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pickFile = (candidate: File | undefined) => {
    if (!candidate) return;
    if (!candidate.name.toLowerCase().endsWith(".pdf")) {
      setError("Spaces only indexes PDF files right now.");
      return;
    }
    setError(null);
    setFile(candidate);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await spacesApi.uploadDocument(spaceId, file);
      onUploaded(result);
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Upload a document" onClose={onClose}>
      <div
        className={`flex flex-col items-center gap-2.5 text-center py-8 px-4 border-[1.5px] border-dashed rounded-md bg-paper cursor-pointer [transition:border-color_0.15s_ease,background_0.15s_ease] ${
          isDragging ? "border-violet-500 bg-[#f3f1fb]" : "border-paper-line hover:border-violet-500 hover:bg-[#f3f1fb]"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          hidden
          onChange={(e) => pickFile(e.target.files?.[0])}
        />
        {file ? (
          <>
            <span
              className="w-9 h-9 rounded-[10px] bg-[linear-gradient(135deg,var(--color-ink-800),var(--color-violet-500))]"
              aria-hidden
            />
            <p className="text-sm font-semibold break-all">{file.name}</p>
            <p className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(1)} MB — click to replace</p>
          </>
        ) : (
          <>
            <span
              className="w-9 h-9 rounded-[10px] bg-[linear-gradient(135deg,var(--color-ink-800),var(--color-violet-500))]"
              aria-hidden
            />
            <p className="text-sm font-semibold break-all">Drop a PDF here, or click to browse</p>
            <p className="text-xs text-muted">Only .pdf files are indexed</p>
          </>
        )}
      </div>
      {error ? <p className="text-[12.5px] text-danger">{error}</p> : null}
      <Button fullWidth isLoading={isLoading} disabled={!file} onClick={handleUpload}>
        Upload &amp; index
      </Button>
    </Modal>
  );
}
