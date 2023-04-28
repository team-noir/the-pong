FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY ./ ./
RUN yarn set version berry
RUN yarn install
RUN yarn build

FROM nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
