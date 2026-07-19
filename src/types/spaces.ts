export interface SpaceListItem {
  id: string;
  name: string;
  description?: string | null;
  is_public: boolean;
  creator_email: string;
}

export interface AccessibleSpacesResponse {
  message: string;
  total_count: number;
  spaces: SpaceListItem[];
}

export interface SpaceCreateRequest {
  name: string;
  description?: string;
  is_public: boolean;
}

export interface SpaceCreateResponse {
  message: string;
  space_id: string;
  name: string;
}

export interface DocumentUploadResponse {
  message: string;
  space_id: string;
  filename: string;
  total_chunks: number;
}

export interface AddUserToSpaceRequest {
  email: string;
}

export interface AddUserToSpaceResponse {
  message: string;
  space_id: string;
  added_user_email: string;
}

export interface SpaceSearchResponse {
  query: string;
  answer: string;
}

// Local-only shape used to render a running Q&A thread in the UI.
// The backend is one-shot (no history endpoint yet) — this is kept client-side per session.
export interface QaTurn {
  id: string;
  query: string;
  answer?: string;
  isLoading: boolean;
  error?: string;
}
