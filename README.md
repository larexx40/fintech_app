<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is a set of RESTful APIs for a simple fintech application built using [Nest](https://github.com/nestjs/nest), a progressive Node.js framework. The APIs allow users to perform basic transactions, manage their accounts, and update their details.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test
```

## Features

### User Management
- **Register a new user:** Allows users to create a new account by providing necessary details.
- **Authenticate a user:** Provides authentication functionality for users to log in securely.
- **Update user details:** Allows users to update their profile information such as name, address, date of birth etc.
- **Delete user account:** Allows users to delete their account if they wish to discontinue using the application.

### Transaction Management
- **Create a new transaction:** Allows users to make transactions (Send, Receive, Spend).
- **Retrieve transactions:** Users can retrieve a list of their transactions to track their financial activities.
- **Retrieve a single transaction:** Provides functionality to retrieve details of a specific transaction by its ID.

### Account Balance
- **Retrieve account balance:** Allows users to check their account balance at any time.
- **Update account balance:** Automatically updates the account balance after each transaction to reflect accurate financial status.

## Technologies Used
- **NestJS**: A progressive Node.js framework used for building scalable and efficient server-side applications.
- **TypeScript**: A statically typed superset of JavaScript used for development, ensuring type safety and improved code maintainability.
- **MongoDB**: A NoSQL database used for storing user data, transaction details, and account balances.
- **Jest**: A testing framework used for writing unit tests to ensure the reliability and correctness of the APIs.
- **HTTP Status Codes**: Proper HTTP status codes are utilized for API responses to convey the success or failure of requests effectively.


## Stay in touch

- Author - [R. O. Olatunji](https://larexx40.github.io/me/){:target="_blank"}
- Linkedin - [R Olatunji](https://www.linkedin.com/in/rokeebolatunji/){:target="_blank"}

## License

Nest is [MIT licensed](LICENSE).
