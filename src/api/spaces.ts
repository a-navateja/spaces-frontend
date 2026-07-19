import { apiClient } from "./client";
import { SPACES } from "../constants/api";
import type {
  AccessibleSpacesResponse,
  AddUserToSpaceResponse,
  DocumentUploadResponse,
  SpaceCreateRequest,
  SpaceCreateResponse,
  SpaceSearchResponse,
} from "../types/spaces";

export const spacesApi = {
  listAccessible: () => apiClient.get<AccessibleSpacesResponse>(SPACES.ACCESSIBLE),

  create: (payload: SpaceCreateRequest) =>
    apiClient.post<SpaceCreateResponse>(SPACES.CREATE, payload),

  uploadDocument: (spaceId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<DocumentUploadResponse>(SPACES.UPLOAD(spaceId), formData, {
      isFormData: true,
    });
  },

  addUser: (spaceId: string, email: string) =>
    apiClient.post<AddUserToSpaceResponse>(SPACES.ADD_USER(spaceId), { email }),

  search: (spaceId: string, query: string) =>
    apiClient.get<SpaceSearchResponse>(SPACES.SEARCH(spaceId, query)),
};
