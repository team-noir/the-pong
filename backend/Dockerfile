FROM node:alpine

COPY . /backend

WORKDIR /backend

RUN apk add nodejs yarn

ENTRYPOINT [ "/bin/sh", "run.sh" ]
