#!/bin/sh

docker-compose down

git fetch
git checkout master
git pull

docker-compose --env-file .env.production --file docker-compose.yml up --build --detach

echo Update script finished

exit 0