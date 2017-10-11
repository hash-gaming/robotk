#! bin/bash

docker-compose up --build --force-recreate
# to stop
# docker rm $(docker ps -a -q)
