# The Pong

## Key Features

### User

- OAuth 로그인
- Two-Factor Authentication
- 닉네임과 프로필 사진 설정 및 변경
- 프로필 페이지
- 팔로워 추가 및 삭제
- 차단 및 차단 해제
- 접속 상태 표시: 온라인, 오프라인, 게임중

### Chat

- 채널 설정: 채널 이름, 채널 종류, 채널 비밀번호 변경
- 채널 종류
  - 공개 채널: 모든 사용자와 채팅
  - 잠금 채널: 채널 입장 시 비밀번호가 필요한 공개 채널
  - 비공개 채널: 초대된 사용자와 채팅
  - DM: 다른 사용자와 1:1 채팅
- 채널 관리: 채널 생성, 채널 삭제, 채널 초대, 채널 나가기
- 채널 참가자 관리:
  - 관리자 임명/해제
  - 조용히: 30초 동안 메시지를 보낼 수 없음
  - 내보내기: 채널에서 내보냄, 재입장 가능
  - 차단하기: 채널에서 차단, 재입장 불가능

### 1:1 Game

- 랜덤 플레이어 매칭
- 게임 커스텀: 모드, 맵
- 게임 결과 히스토리
- 레벨 시스템

## Stack

### Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Tanstack Query](https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433e38?style=for-the-badge&logo=zustand&logoColor=white)
![Axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Mock Service Worker](https://img.shields.io/badge/Mock_Service_Worker-ff6933?style=for-the-badge&logoColor=white)
![Konva](https://img.shields.io/badge/konva-0D83CD?style=for-the-badge&logo=konva&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HeadlessUI](https://img.shields.io/badge/headlessui-66E3FF?style=for-the-badge&logo=headlessui&logoColor=white)
![Heroicons](https://img.shields.io/badge/Heroicons-8B5CF6?style=for-the-badge&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
![Yarn Berry](https://img.shields.io/badge/yarn_berry-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

### Backend

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgreSQL-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Passport](https://img.shields.io/badge/passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
![Yarn Berry](https://img.shields.io/badge/yarn_berry-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

### Communication

![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![WebRTC](https://img.shields.io/badge/webrtc-333333?style=for-the-badge&logo=webrtc&logoColor=white)

### DevOps

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Make](https://img.shields.io/badge/Make-000000?style=for-the-badge&logo=make&logoColor=white)

### Collaboration

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

## How to Run

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
2. 폼을 작성합니다. `Redirect URI`를 `http://localhost/api/v1/auth/42/return`로 작성합니다.
3. `.env` 혹은 `.env.example` 파일에 각 내용을 복사합니다.
   - `FT_UID`: 생성한 앱의 UID
   - `FT_SECRET`: 생성한 앱의 SECRET
   - `FT_CB`: `http://localhost/api/v1/auth/42/return`

## Development

Install dependencies with [Node.js(^18)](https://nodejs.org/) and [yarn berry](https://yarnpkg.com/getting-started/install)

```bash
$ node -v
v18.14.2
$ yarn set version stable
$ yarn --version
3.4.1
```

```shell
$ cp .env.development.example .env.development
$ vi .env.development # edit file
$ docker compose -f docker-compose-dev.yml --env-file .env.development build --no-cache
$ docker compose -f docker-compose-dev.yml --env-file .env.development up -d
```

- Frontend: http://localhost:8080
- Backend API: http://localhost:8080/api
- Backend API Docs(Swagger): http://localhost:8080/api/docs
- Backend socket.io: http://localhost:8080/socket.io
- Database GUI(Prisma studio): http://localhost:5555
