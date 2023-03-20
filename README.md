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

## Setup

### .env

```shell
$ cp .env.example .env
$ vi .env # edit file
```

### 외부 API 서비스 키 발급 받기

#### 42 API

1. 42 인트라넷에 로그인 한 다음 [여기](https://profile.intra.42.fr/oauth/applications/new)에서 새로운 앱을 생성합니다.
2. 폼을 작성합니다. `Redirect URI`를 `http://localhost:8080/api/v1/auth/42/return`로 작성합니다.
3. `.env` 혹은 `.env.example` 파일에 각 내용을 복사합니다.
   - `FT_UID`: 생성한 앱의 UID
   - `FT_SECRET`: 생성한 앱의 SECRET

## Development

```shell
$ cp .env.development.example .env.development
$ vi .env.development # edit file
$ docker compose -f docker-compose-dev.yml --env-file .env.development build --no-cache
$ docker compose -f docker-compose-dev.yml --env-file .env.development up -d
```

- frontend: http://localhost:8080
- backend: http://localhost:8080/api
