FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./ ./
RUN yarn set version berry

ENTRYPOINT [ "/bin/sh", "run.sh" ]
