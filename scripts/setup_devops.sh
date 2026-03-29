#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/.env"
EXAMPLE_FILE="${ROOT_DIR}/.env.example"

if [[ ! -f "${EXAMPLE_FILE}" ]]; then
  echo "Missing ${EXAMPLE_FILE}." >&2
  exit 1
fi

if [[ -f "${ENV_FILE}" ]]; then
  echo ".env already exists; leaving it unchanged."
else
  cp "${EXAMPLE_FILE}" "${ENV_FILE}"
  echo "Created .env from .env.example"
fi

mkdir -p "${ROOT_DIR}/logs" "${ROOT_DIR}/tmp"

echo "Setup complete."
echo "Next steps:"
echo "  1) Edit .env with real values"
echo "  2) Run ./scripts/run_agent3.sh"
