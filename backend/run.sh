#!/bin/sh

yarn prisma migrate dev --name=thepong
yarn start
