#!/bin/sh

echo Execute docker-compose down
docker-compose down

echo Update git and pull latest code from master
git fetch
git checkout master
git pull

echo Rebuild Docker containers
docker-compose --env-file .env.production --file docker-compose.yml up --build --detach
