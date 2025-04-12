# PracticeSoftwareTesting E2E Tests

This repository contains automation scenarios for the [PracticeSoftwareTesting](https://practicesoftwaretesting.com/) application, using Playwright for robust browser automation. Tests can be run locally or in a CI/CD pipeline with GitHub Actions, with environment-specific configurations.

## Table of Contents

- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running Tests](#running-tests)

## Installation

- Install [Node.js](https://nodejs.org/en/) LTS version

- Check that Node.js is installed

```bash
node -v
```

- Check that package manager npm is installed

```bash
npm -v
```

- Clone the repository

```bash
git clone https://github.com/EugenePetrik/practice_software_testing_app_tests.git
cd practice_softwaretesting_app_tests
```

- Install project dependencies

```bash
npm ci
```

## Environment Configuration

The following environment variables can be configured in `.env` files or system variables. Some of them are also used in CI job configurations:

| Variable             | Description                                                                    | CI |
|----------------------|--------------------------------------------------------------------------------|----|
| `WEB_URL`            | Base URL for the UI application                                                | ✅ |
| `API_URL`            | Base URL for the API application                                               | ✅ |
| `HEADLESS`           | Headless mode for the browser                                                  | ✅ |
| `MAX_WORKERS`        | Maximum number of parallel workers                                             | ✅ |
| `USER_EMAIL`         | Default user email with user role                                              | ❌ |
| `USER_PASSWORD`      | Default user password with user role                                           | ❌ |
| `USER_NAME`          | Default user name with user role                                               | ❌ |
| `ADMIN_EMAIL`        | Default user email with admin role                                             | ❌ |
| `ADMIN_PASSWORD`     | Default user password with admin role                                          | ❌ |
| `ADMIN_NAME`         | Default user name with admin role                                              | ❌ |

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run all tests for specific browser

```bash
npx playwright test --project=chromium
```

### Run tests in UI mode

```bash
npx playwright test --ui
```

### Generate HTML report

```bash
npx playwright show-report
```
