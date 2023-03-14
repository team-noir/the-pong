FROM node:alpine

COPY . /backend

WORKDIR /backend

RUN apk add nodejs yarn
RUN yarn set version berry

ENTRYPOINT [ "/bin/sh", "run.sh" ]
