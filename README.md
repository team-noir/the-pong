# The Pong

```shell
# Create and start containers
$ docker compose up -d

# Start services
$ docker compose start --build

# Stop and remove containers, networks
$ docker compose down

# Removes stopped service containers
$ docker compose rm

# Stop and remove running containers, networks, images, and volumes
$ docker compose down --rmi all --volumes --remove-orphans
```

## Development

```shell
$ cp .env.development.example .env.development
$ vi .env.development # edit file
$ docker compose -f docker-compose-dev.yml --env-file .env.development build --no-cache
$ docker compose -f docker-compose-dev.yml --env-file .env.development up -d
```
