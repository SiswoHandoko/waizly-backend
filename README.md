
## Description

I implemented this service using [Nest](https://github.com/nestjs/nest) and applied several design patterns, including Dependency Injection, decorators, and the middleware pattern.

## Installation

```bash
$ npm install
```

## Create .env File (example only)
```bash
NODE_ENV=development

POSTGRE_PORT=5432
POSTGRE_DIALECT=postgres
POSTGRE_HOST=localhost
POSTGRE_USER=postgres
POSTGRE_PASS=
POSTGRE_DB_NAME=waizly

JWT_SECRET=secretwaizly
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Database Migration (PostgreSQL)

```bash
# migration up all table
$ npx sequelize-cli db:migrate

# seed the data for login
$ npx sequelize-cli db:seed:all
```

## Authentication and Authorization
use this username and password for login (seeded already by migration automatically)
```bash
{
    "username": "johndoe",
    "password": "12345"
}
```

## Unit Test Command

```bash
# unit tests
$ npm run test

# test show coverage
$ npm run test:cov
```

