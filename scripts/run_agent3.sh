#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/.env"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing .env. Run ./scripts/setup_devops.sh first." >&2
  exit 1
fi

set -a
source "${ENV_FILE}"
set +a

: "${AGENT_NAME:=agent-3}"
: "${APP_PORT:=8080}"
: "${LOG_LEVEL:=info}"

echo "Starting ${AGENT_NAME} in ${APP_ENV:-development} mode on port ${APP_PORT} (log level: ${LOG_LEVEL})"

echo "[placeholder] Replace this section with your real service startup command."

echo "Example: docker compose up --build"
