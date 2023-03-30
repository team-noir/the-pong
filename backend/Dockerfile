FROM node:alpine

WORKDIR /usr/src/app

COPY ./ ./
RUN yarn set version berry
RUN yarn install

ENTRYPOINT [ "/bin/sh", "run.sh" ]
