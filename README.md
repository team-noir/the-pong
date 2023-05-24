<div align="center">
  <img src="./readme-header.svg" alt="Header">
</div>

<details open>
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#%EA%B0%9C%EC%9A%94">개요</a></li>
    <li><a href="#%ED%8C%80%EC%9B%90">팀원</a></li>
    <li><a href="#%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EB%B0%8F-%EC%82%AC%EC%9A%A9-%EA%B8%B0%EC%88%A0">주요 기능</a></li>
    <li><a href="#%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D">기술 스택</a></li>
    <li><a href="#%EA%B0%9C%EB%B0%9C--%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85-%EB%A1%9C%EA%B7%B8">개발 & 트러블슈팅 로그</a></li>
    <li><a href="#%EC%8B%A4%ED%96%89-%EB%B0%A9%EB%B2%95">실행 방법</a></li>
    <li><a href="#%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD">개발 환경</a></li>
  </ul>
</details>

[English](./README-en.md) | [한국어](./README.md)

## 개요

The Pong은 채팅과 1:1 게임 서비스를 제공하는 애플리케이션입니다.

- 개발 기간: 2023.3 ~ 2023.5 (10주)
- [Notion 문서](https://sarchoi42.notion.site/0ae56f9f11904eb68d6278f40a8d3cf5?v=5208282fc9504853ab15d475515b44ff)

## 팀원

- 최사랑 [@srngch](https://github.com/srngch): 팀 리더, 프론트엔드, 백엔드
- 김희현 [@hhkim0729](https://github.com/hhkim0729): 프론트엔드
- 박찬울 [@PCHANUL](https://github.com/PCHANUL): 백엔드

## 주요 기능 및 사용 기술

### 회원

- OAuth 로그인
- Two-Factor Authentication
- 닉네임 및 프로필 이미지 설정 및 변경
- 프로필 페이지
- 팔로우와 언팔로우, 차단과 차단 해제
- 회원 상태 표시: 온라인, 오프라인, 게임 중

### 채팅

- 채널 설정: 채널 이름, 타입 및 비밀번호 변경
- 채널 타입:
  - 공개 채널: 모든 사용자와 채팅할 수 있는 채널
  - 비밀번호 채널: 비밀번호를 입력해야 입장할 수 있는 공개 채널
  - 비공개 채널: 초대된 사용자와의 채팅
  - DM: 다른 사용자와 1:1 채팅할 수 있는 채널
- 채널 관리: 채널 생성, 채널 삭제, 채널에 사용자 초대, 채널 나가기
- 채널 참여자 관리:
  - 관리자 지정/해제
  - 음소거: 30초 동안 메시지를 보낼 수 없음
  - 내보내기: 채널에서 제거되지만 다시 입장할 수 있음
  - 차단하기: 채널에서 차단되어 다시 입장할 수 없음

### 1:1 게임

- 실시간 게임 플레이
- 랜덤 플레이어 매칭
- 게임 커스터마이징: 모드, 맵
- 게임 결과 히스토리
- 레벨 시스템

## 기술 스택

### 프론트엔드

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Tanstack Query](https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433e38?style=for-the-badge&logo=zustand&logoColor=white)
![Axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![WebRTC](https://img.shields.io/badge/webrtc-333333?style=for-the-badge&logo=webrtc&logoColor=white)
![Mock Service Worker](https://img.shields.io/badge/Mock_Service_Worker-ff6933?style=for-the-badge&logoColor=white)
![Konva](https://img.shields.io/badge/konva-0D83CD?style=for-the-badge&logo=konva&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HeadlessUI](https://img.shields.io/badge/headlessui-66E3FF?style=for-the-badge&logo=headlessui&logoColor=white)
![Heroicons](https://img.shields.io/badge/Heroicons-8B5CF6?style=for-the-badge&logoColor=white)

### 백엔드

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgreSQL-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Passport](https://img.shields.io/badge/passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

### 개발

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
![Yarn Berry](https://img.shields.io/badge/yarn_berry-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### 데브옵스

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Make](https://img.shields.io/badge/Make-000000?style=for-the-badge&logo=make&logoColor=white)

### 협업

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-FFFFFF.svg?style=for-the-badge&logo=notion&logoColor=black)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

## 개발 & 트러블슈팅 로그

- [FE 개발 로그] 무한 스크롤 구현하기 - 김희현(@hhkim0729) [👉 자세히 보러가기](https://github.com/team-noir/the-pong/wiki/%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)

## 실행 방법

### 실행 환경 설정

실행에 필요한 의존성을 설치합니다.

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

### 외부 API 서비스 키 발급 받기

#### Google OAuth

1. [Google 개발자 문서](https://developers.google.com/identity/protocols/oauth2/web-server?hl=ko#creatingcred)를 참고하여 OAuth 2.0 클라이언트를 생성합니다.
2. 양식을 작성하는 단계에서 `리디렉션 URI`의 내용은 `http://localhost/api/v1/auth/google/return`로 작성합니다.
3. `.env` 혹은 `.env.example` 파일에 각 내용을 복사합니다.
   - `GOOGLE_ID`: OAuth 클라이언트 ID
   - `GOOGLE_SECRET`: OAuth 보안 비밀번호
   - `GOOGLE_CB`: 리디렉션 URI (`http://localhost/api/v1/auth/google/return`)

### 설치 및 실행

```shell
$ git clone https://github.com/team-noir/the-pong
$ cd the-pong

# env 파일을 작성합니다.
$ cp .env.example .env
$ vi .env

# Docker Compose로 컨테이너를 빌드하고 실행합니다.
$ docker compose build --no-cache
$ docker compose up -d

# Docker Compose 대신 Makefile을 사용할 수도 있습니다.
$ make up
```

## 개발 환경

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
├── .github    # Github 설정 파일
├── .vscode    # vscode 설정 파일
├── backend
│   ├── prisma # 데이터베이스 스키마
│   ├── src    # 소스 코드
│   └── test   # 테스트 파일
├── frontend
│   ├── public # 정적 파일
│   └── src    # 소스 코드
└── nginx      # Nginx 설정 파일
```

### 커밋 메시지 컨벤션

[.gitmessage](.gitmessage.txt)

### 개발 포트 & URLs

- Frontend: http://localhost:8080
- Backend API: http://localhost:8080/api
- Backend API Docs(Swagger): http://localhost:8080/api/docs
- Backend socket.io API: http://localhost:8080/socket.io
- Database GUI(Prisma studio): http://localhost:5555
