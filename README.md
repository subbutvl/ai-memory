# Agent 3 DevOps Setup

This repository includes a lightweight DevOps bootstrap for **Agent 3**.

## Included

- `scripts/setup_devops.sh` — initializes local folders and creates `.env` from `.env.example`.
- `scripts/run_agent3.sh` — loads `.env` and starts Agent 3 (placeholder startup command included).
- `.env.example` — baseline environment configuration template.

## Quick start

1. Make scripts executable:

   ```bash
   chmod +x scripts/*.sh
   ```

2. Run setup:

   ```bash
   ./scripts/setup_devops.sh
   ```

3. Update values in `.env`.

4. Run Agent 3:

   ```bash
   ./scripts/run_agent3.sh
   ```

## Notes

- The run script currently contains a placeholder command; replace it with your process manager, Docker, or service command.
- Keep secrets out of version control by only committing `.env.example`, not `.env`.
