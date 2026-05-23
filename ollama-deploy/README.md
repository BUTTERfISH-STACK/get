# Ollama HTTPS Deployment

This folder contains an example Docker Compose deployment for Ollama with an HTTPS reverse proxy.

## What it does

- Runs Ollama in Docker
- Exposes Ollama on port `11434` internally
- Uses Nginx to terminate TLS on ports `80` and `443`
- Forwards requests securely to the Ollama container

## Setup

1. Create a public hostname, e.g. `ollama.yourdomain.com`
2. Place TLS certificates into `ollama-deploy/certs/`
   - `fullchain.pem`
   - `privkey.pem`

3. Update `ollama-deploy/nginx.conf`
   - Replace `ollama.yourdomain.com` with your real hostname

4. Run:

```bash
cd ollama-deploy
docker compose up -d
```

## Environment

- `OLLAMA_BASE_URL=https://ollama.yourdomain.com`
- `OLLAMA_API_KEY=<your-ollama-key>` if your proxy/Ollama is protected

## Recommended models

Your app is already configured to use:
- `qwen2.5-coder:3b`
- `deepseek-v3.1:671b-cloud`
- `qwen3:1.7b`

If you want the public host to use a different model, update the Vercel env vars accordingly.

## Notes

- If you need automatic certificates, generate them with Certbot or another ACME client.
- On a real server, you can drop the `ports` mapping for `11434` and expose only `80`/`443`.
