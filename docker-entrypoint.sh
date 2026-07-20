#!/bin/sh
set -e

# Cloud Run sets $PORT at runtime; default to 8080 locally.
PORT="${PORT:-8080}"
sed -i "s/__PORT__/${PORT}/g" /etc/nginx/conf.d/default.conf

# Regenerate env.js from the container's actual runtime env vars, so the
# same built image can be deployed anywhere without a rebuild.
cat <<EOF > /usr/share/nginx/html/env.js
window.__ENV__ = {
  VITE_API_BASE_URL: "${VITE_API_BASE_URL:-}"
};
EOF

exec nginx -g "daemon off;"