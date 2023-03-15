FROM node:alpine

RUN mkdir backend
WORKDIR /backend
COPY ./ ./

RUN apk add nodejs yarn
RUN yarn set version berry
RUN yarn install

ENTRYPOINT [ "yarn", "start" ]
