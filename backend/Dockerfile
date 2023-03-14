FROM node:alpine

COPY . /backend

WORKDIR /backend

RUN apk add nodejs yarn
RUN yarn set version berry
RUN yarn install

ENTRYPOINT [ "/bin/sh", "run.sh" ]
