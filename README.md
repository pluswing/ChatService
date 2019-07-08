# Simple Chat System

This is simple chat service with Vue.js + Typescript + MySQL.

## screenshots

## Installation

```bash
cp .env.sample .env
docker-compose up
```

### for developer

```bash
docker-compose build
docker-compose run api npm run setup
docker-compose run operator npm run setup
docker-compose run client npm run setup
docker-compose up
```

add operator account

```bash
docker-compose run api npm run operator:create <name> <login id> <password>
```

client:
http://localhost:3011

operator:
http://localhost:3012


## Usage
