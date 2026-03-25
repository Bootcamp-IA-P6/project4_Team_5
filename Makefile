.PHONY: dev docker docker-down docker-rebuild clean

# Run locally with uv
dev:
	uv run python app/main.py

# Run with Docker
docker:
	docker compose up --build

# Stop Docker
docker-down:
	docker compose down

# Rebuild Docker from scratch
docker-rebuild:
	docker compose down --rmi all
	docker compose up --build

# Clean Docker (images, volumes, cache)
clean:
	docker compose down --rmi all --volumes
	docker system prune -a
