FROM node:lts

WORKDIR /usr/src/app

COPY ./ ./
RUN yarn set version berry

ENTRYPOINT [ "/bin/sh", "run.sh" ]
