# Storefront Backend

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [Steps to run the Project](#steps-to-run-the-project)
  - [Installing and Environment Setup](#installing-and-environment-setup)
  - [Database Creation & Migration](#database-creation-and-migration)
- [Scripts available](#scripts-available)
- [License](#license)

### About the Project

**Storefront Backend** is a Udacity Full-Stack Nanodegree project which demonstrates the capabilites of using `Nodejs` as a backend language, `Express` to manipulate servers and `Postgres` as DBMS.

The project is the backend-side of a Storefront project with handling the incoming requests and APIs across the Express server that talks to Postgres database.

All models and handlers are tested using Jasmine.

### Technologies used

- **_NodeJs_** => Backend Language
- **_Express_** => Server Manipulation
- **_PostgreSQL_** => DBMS
- **_Typescript_**
- **_prettier_** and **_eslint_** => Formatting and Linting
- **_Jasmine_** => Unit Testing
- **_JWT_** => Authentication

### Steps to Run The Project

- #### Installing and Environment Setup

1. Clone the repository by running this command
   `git clone https://github.com/MalakJoseph/storefront-backend.git`.
2. Go to the project directory `cd storefront-backend`.
3. Install packages with `yarn install`.
4. Clone a copy of `.env.example` into `.env`.
5. Follow the instructions below to get you start...

- #### Database Creation and Migration

1. Switch the terminal user from Root (the default) to postgres, which we will use to access the database `psql -U postgres`

2. In psql run the following
   - For **Development**
     - `CREATE DATABASE storefront_backend;`
     - `\c storefront_backend`
   - For **Testing**
     - `CREATE DATABASE storefront_backend_test;`
     - `\c storefront_backend_test`
3. On another terminal run
   - `yarn`
   - `yarn migrate-up`
4. Default `PORT=5432` for database and `PORT=3000` for express server.

Don't forget to alter between _development_ and _testing_ databases using `NODE_ENV` in `.env` file.

### Scripts available

1. `"start"` to run the production version from the dist folder.
2. `"dev"` to run the development version using **nodemon**.
3. `"migrate-up"` syncing the database by running migration.
4. `"migrate-reset"` erasing the database migrations.
5. `"test"` test using **Jasmine** and clear the test-database after.
6. `"lint"` for linting with **eslint**.
7. `"prettier"` formatting.

### License

This project is licensed under the terms of the ISC license.
