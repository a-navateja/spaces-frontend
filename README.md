# Spaces — frontend

React + TypeScript client for the Spaces backend (FastAPI). Built with Vite,
plain `fetch` for networking (no axios), and no CSS framework — styling is
hand-rolled from a small design-token system in `src/tokens.css`.

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your backend
npm run dev
```

Build for production with `npm run build`; output goes to `dist/`.

## Folder structure

```
src/
  api/          fetch wrapper + typed calls per backend resource (auth, spaces)
  types/        TS types mirroring the backend's Pydantic schemas
  context/      AuthContext (session), ToastContext (notifications)
  hooks/        useAuth, useToast
  components/
    ui/         Button, Input, Modal, Spinner, EmptyState — no page logic
    layout/     AuthLayout (split-screen auth shell), AppLayout (sidebar + outlet), RequireAuth
    spaces/     SpaceCard, CreateSpaceModal, AddMemberModal, UploadDocumentModal, ChatBox
  pages/
    auth/       SignupRequest → SignupConfirm, Login, ForgotPassword, ResetPassword
    SpacesListPage.tsx, SpaceDetailPage.tsx, NotFoundPage.tsx
  constants/    API endpoint paths + client-side route paths, kept in one place
  utils/        localStorage session helper, form validators
```

## How auth maps to the backend

- **Sign up** is two steps because the backend is: `POST /auth/verify-email`
  emails a link shaped `{CLIENT_URL}/{token}`; the frontend route
  `/signup/:token` reads that token and calls `POST /auth/signup` with it as
  the bearer token (see `get_verified_user` on the backend).
- **Password reset** is the same pattern: `POST /auth/request-password-reset`
  emails `{CLIENT_URL}/reset-password/{token}`; the `/reset-password/:token`
  route calls `POST /auth/reset-password` with that token as the bearer.
- **Login** returns `access_token` directly; it's persisted in
  `localStorage` via `AuthContext` and attached as `Authorization: Bearer`
  on every subsequent call by `api/client.ts`.

Set `VITE_API_BASE_URL` in `.env` to wherever `CLIENT_URL` in the backend's
settings points, so emailed links land on this app.

## Known gaps (backend doesn't have these endpoints yet)

- No `GET /spaces/{id}` — the detail page currently resolves a space by
  filtering the `GET /spaces/accessible` list client-side. Swap this for a
  direct fetch once that endpoint exists (see the `NOTE` in
  `SpaceDetailPage.tsx`).
- No endpoint to list a space's documents or members — the detail page only
  shows uploads/invites made in the current session, not historical ones.
- No email-verification "confirm" endpoint — verification and signup happen
  in the same `POST /auth/signup` call, authenticated by the emailed token.
