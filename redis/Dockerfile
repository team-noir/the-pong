FROM redis:latest

COPY users.acl /etc/redis/users.acl
COPY redis.conf /etc/redis/redis.conf

ENTRYPOINT [ "redis-server", "/etc/redis/redis.conf"]
