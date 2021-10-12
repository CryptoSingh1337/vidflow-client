<img src="/static/v.png" align="right" />

# VidFlow

An open source content sharing platform (similar to YouTube). This application will be highly scalable because we are following micro-service architecture in [backend](https://github.com/CryptoSingh1337/vidflow-backend) and the frontend is created using [nuxt](https://github.com/nuxt/nuxt.js).

[![Issues Closed](https://img.shields.io/github/issues-closed/CryptoSingh1337/vidflow-client?color=red)](https://github.com/CryptoSingh1337/vidflow-client/issues?q=is%3Aissue+is%3Aclosed)
[![Issues Open](https://img.shields.io/github/issues/CryptoSingh1337/vidflow-client?color=green)](https://github.com/CryptoSingh1337/vidflow-client/issues)
[![PRs Open](https://img.shields.io/github/issues-pr/CryptoSingh1337/vidflow-client)](https://github.com/CryptoSingh1337/vidflow-client/pulls)
![Last Commit](https://img.shields.io/github/last-commit/CryptoSingh1337/vidflow-client?color=informational)
![PRs Welcome](https://img.shields.io/badge/prs-welcome-ff69b4)

## Features

- Stunning and responsive UI.
- Dark and light theme.
- Material design.
- Sign in / Sign up
- Home page
- Trending page
- Subscriptions page
- History page
- Liked videos page
- Comment on videos
- Upload video model
- User Dashboard page
- Channel page
- Settings page

## Run Locally

Clone the project

```bash
  git clone https://github.com/CryptoSingh1337/vidflow-client.git
```

Go to the project directory

```bash
  cd vidflow-client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Tech Stack

- **Client**:

  - JavaScript
  - Vue
  - Nuxt
  - Vuex
  - Vuex Router
  - Vuetify
  - **Deployment**:
    - Vercel

- **Server**:
  - Java
  - Spring Boot
  - **Cloud**:
    - Spring Cloud Netflix Eureka Server and Client
    - Spring Cloud Gateway
    - Spring Cloud Bus
    - Spring Cloud Config Server
    - Spring Cloud Open Feign
    - Spring Cloud Resilience4j
    - Spring Cloud Zipkin
    - Spring Cloud Sleuth
    - Microsoft Azure Storage service
  - **Deployment**:
    - Microsoft Azure

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains the uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains the Vue.js components. Components make up the different parts of the page and can be reused and imported into the pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of the Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains the application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains the static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains the Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
