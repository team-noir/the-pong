<div align="center">
  <img src="./readme-header.svg" width="800" height="400" alt="Header">
</div>

<details open>
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#summary">Summary</a></li>
    <li><a href="#team-members">Team Members</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#stacks">Stacks</a></li>
    <li><a href="#how-to-run">How to Run</a></li>
    <li><a href="#development-and-troubleshooting-logsin-korean">Development and Troubleshooting Logs</a></li>
    <li><a href="#development">Development</a></li>
  </ul>
</details>

<hr />

[English](./README-en.md) | [한국어](./README.md)

## Summary

The Pong is a application that provides a chat and 1:1 game service.

- Development period: 2023.3 ~ 2023.5 (10 weeks)
- [Notion Document](https://sarchoi42.notion.site/0ae56f9f11904eb68d6278f40a8d3cf5?v=5208282fc9504853ab15d475515b44ff)

## Team Members

- Sarang Choi [@srngch](https://github.com/srngch): Team Leader, Frontend, Backend
- Heehyun Kim [@hhkim0729](https://github.com/hhkim0729): Frontend
- Chanul Pak [@PCHANUL](https://github.com/PCHANUL): Backend

## Key Features

### User

- OAuth login
- Two-Factor Authentication
- Set and change nickname and profile image
- Profile page
- Follow/unfollow and block/unblock users
- User status display: online, offline, in-game

### Chat

- Channel settings: change channel name, type and password
- Channel types:
  - Public channels: Chat with all users
  - Locked Channel: A public channel that requires a password to enter
  - Private Channel: Chat with invited users
  - DM: 1:1 chat with another user
- Channel management: create channel, delete channel, invite users to the channel, leave channel
- Manage channel participants:
  - Grant/Revoke admin
  - Mute: Unable to send messages for 30 seconds
  - Kick: Removed from the channel but can re-enter
  - Ban: Blocked from the channel, re-entry is not possible

### 1:1 Game

- Random player matching
- Game customization: mods, maps
- Game result history
- Level system

## Stacks

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

### Backend

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgreSQL-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Passport](https://img.shields.io/badge/passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![WebRTC](https://img.shields.io/badge/webrtc-333333?style=for-the-badge&logo=webrtc&logoColor=white)

### Development

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
![Yarn Berry](https://img.shields.io/badge/yarn_berry-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### DevOps

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Make](https://img.shields.io/badge/Make-000000?style=for-the-badge&logo=make&logoColor=white)

### Communication

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-FFFFFF.svg?style=for-the-badge&logo=notion&logoColor=black)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

## Development and Troubleshooting Logs(In Korean)

- [FE Development Log] Implementing infinite scroll - Heehyun Kim(@hhkim0729) [👉 Go to read](https://github.com/team-noir/the-pong/wiki/%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)

## How to Run

### Requirements

Install dependencies with...

- [Node.js(^18)](https://nodejs.org/)
- [Yarn Berry(^3.4)](https://yarnpkg.com/getting-started/install)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Make](https://www.gnu.org/software/make/)

```shell
$ node -v
v18.14.2
$ yarn set version stable
$ yarn --version
3.4.1
```

### Set up OAuth Client

#### Google OAuth

1. Create an OAuth 2.0 client by referring to the [Google Developer Docs](https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred).
2. In the form filling step, enter `http://localhost/api/v1/auth/google/return` as the value of the `redirect URI`.
3. Copy each value to the `.env` or `.env.example` file.
   - `GOOGLE_ID`: OAuth client ID
   - `GOOGLE_SECRET`: OAuth client secret
   - `GOOGLE_CB`: OAuth redirect URI (`http://localhost/api/v1/auth/google/return`)

### Installation & Run

```shell
$ git clone https://github.com/team-noir/the-pong
$ cd the-pong

# Set and edit env file
$ cp .env.example .env
$ vi .env

# Run containers
$ docker compose build --no-cache
$ docker compose up -d

# Use Makefile instead of docker-compose
$ make up
```

## Development

```shell
$ git clone https://github.com/team-noir/the-pong
$ cd the-pong

# Set and edit env file
$ cp .env.development.example .env.development
$ vi .env.development

#
$ docker compose -f docker-compose-dev.yml --env-file .env.development build --no-cache
$ docker compose -f docker-compose-dev.yml --env-file .env.development up -d
```

### Project Structure

```shell
/
├── .github    # github settings
├── .vscode    # vscode settings
├── backend
│   ├── prisma # database schema
│   ├── src    # source code
│   └── test   # test code
├── frontend
│   ├── public # static files
│   └── src    # source code
└── nginx      # nginx config
```

### Commit Message Convention

[.gitmessage](.gitmessage.txt)

### Development Ports & URLs

- Frontend: http://localhost:8080
- Backend API: http://localhost:8080/api
- Backend API Docs(Swagger): http://localhost:8080/api/docs
- Backend socket.io API: http://localhost:8080/socket.io
- Database GUI(Prisma studio): http://localhost:5555
