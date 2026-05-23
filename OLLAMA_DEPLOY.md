# Vellon AI — Self-Hosted Ollama Production Deployment Guide

## Overview
Vercel cannot run Ollama. You must host Ollama on a separate Ubuntu VPS, Railway, RunPod, or Hetzner server.

This guide gives you a secure, production-ready Ollama setup with:

- Docker + GPU support
- API key authentication (matches the OLLAMA_API_KEY in your .env)
- Auto-restart
- Model preloading (qwen2.5:7b, llama3.1, deepseek, etc.)
- Reverse proxy (nginx) for HTTPS

---

## 1. Server Requirements (Recommended)

- Ubuntu 22.04+
- NVIDIA GPU (A10, A100, 4090, or even RTX 3060 for light load)
- 16GB+ RAM, 100GB+ SSD
- Or use RunPod / Vast.ai for cheap GPU

---

## 2. Quick Docker Setup (Recommended)

SSH into your server and run:

```bash
# Install Docker + NVIDIA Container Toolkit
curl -fsSL https://get.docker.com | sh
sudo apt install -y nvidia-container-toolkit
sudo systemctl restart docker
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  ollama:
    image: ollama/ollama:latest
    container_name: vellon-ollama
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - ollama:/root/.ollama
    environment:
      - OLLAMA_HOST=0.0.0.0
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  # Optional: Lightweight secure proxy with API key auth
  ollama-proxy:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "443:443"
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs
    depends_on:
      - ollama

volumes:
  ollama:
```

---

## 3. Secure Nginx Config with API Key

Create `nginx.conf`:

```nginx
events {}

http {
  upstream ollama {
    server ollama:11434;
  }

  server {
    listen 80;
    server_name ollama.yourdomain.com;

    location / {
      if ($http_authorization != "Bearer YOUR_OLLAMA_API_KEY_HERE") {
        return 401 "Unauthorized";
      }
      proxy_pass http://ollama;
      proxy_set_header Host $host;
      proxy_set_header Authorization $http_authorization;
    }
  }
}
```

Replace `YOUR_OLLAMA_API_KEY_HERE` with the value from your Vercel `.env` `OLLAMA_API_KEY`.

---

## 4. Pull All Required Models

After docker-compose up -d:

```bash
docker exec -it vellon-ollama ollama pull qwen2.5:7b
docker exec -it vellon-ollama ollama pull llama3.1:8b
docker exec -it vellon-ollama ollama pull deepseek-r1:7b
docker exec -it vellon-ollama ollama pull mistral
docker exec -it vellon-ollama ollama pull codellama:7b
```

---

## 5. Point Your Vercel .env

Set:

```
OLLAMA_BASE_URL=https://ollama.yourdomain.com
OLLAMA_API_KEY=the-same-key-as-above
```

---

## 6. Production Tips

- Use Cloudflare or Nginx for SSL
- Monitor with `docker stats`
- Set up cron to prune unused models
- For high scale: use multiple Ollama instances behind load balancer + queue (BullMQ + Redis)
- Cost: ~$0.40–$1.20/hour on RunPod for good GPU

---

You now have a fully private, production-grade, self-hosted AI brain powering Vellon AI.

For any questions, refer to the official Ollama + Docker GPU docs.
