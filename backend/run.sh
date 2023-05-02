yarn prisma:migrate
if [ "$NODE_ENV" != "development" ]; then
	yarn prisma:studio &
fi
yarn start

