#!/usr/bin/env bash

echo "HI"

set -e

docker-compose up -d db

WAIT_FOR_PG_ISREADY="while ! pg_isready --quiet; do sleep 1; done;"
docker-compose exec db bash -c "$WAIT_FOR_PG_ISREADY"

echo "[db] ready to accept connections"

jest --forceExit

echo "running tests"

docker-compose down -v --remove-orphans