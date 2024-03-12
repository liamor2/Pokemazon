#!/usr/bin/env bash
npm run serve | tr -d '\r'
node server.cjs | tr -d '\r'
docker-compose up