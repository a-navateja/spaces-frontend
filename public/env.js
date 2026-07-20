// Local/dev fallback only. In the deployed container this file is
// regenerated at startup by docker-entrypoint.sh from real env vars —
// do not rely on the values here outside local `npm run dev`.
window.__ENV__ = {
  VITE_API_BASE_URL: "http://localhost:8000",
};