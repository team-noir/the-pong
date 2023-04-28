FROM nginx:stable-alpine

COPY ./proxy.conf /etc/nginx/conf.d/proxy.conf

CMD ["nginx", "-g", "daemon off;"]
