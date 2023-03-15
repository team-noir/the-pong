FROM node:alpine

RUN mkdir backend
WORKDIR /backend
COPY ./ ./

RUN apk add nodejs yarn
RUN yarn set version berry

ENTRYPOINT [ "yarn", "start" ]
