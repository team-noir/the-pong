FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./
RUN yarn set version berry
RUN yarn install
COPY ./ ./

ENTRYPOINT [ "/bin/sh", "run.sh" ]
