#!/bin/sh
set -e

# Cloud Run sets $PORT at runtime; default to 8080 locally.
PORT="${PORT:-5173}"
sed -i "s/__PORT__/${PORT}/g" /etc/nginx/conf.d/default.conf

exec nginx -g "daemon off;"