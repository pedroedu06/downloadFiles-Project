Backend (TypeScript) - docker

Instruções rápidas:

- Copie `.env.example` para `.env` e preencha `YT_DATA_API_KEY` e `BASE_URL`.
- Build e subir com Docker Compose:

```bash
docker compose up -d --build
```

- Ver logs:

```bash
docker compose logs -f
```

- Parar e remover:

```bash
docker compose down
```

Observações:
- O `docker-compose.yml` carrega variáveis de ambiente do arquivo `.env`.
- O container inclui `ffmpeg` para processamento de mídia.
