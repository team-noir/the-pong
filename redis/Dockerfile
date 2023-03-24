FROM redis:latest

COPY user.acl /etc/redis/user.acl

ENTRYPOINT [ "redis-server", "--aclfile /etc/redis/user.acl" ]
