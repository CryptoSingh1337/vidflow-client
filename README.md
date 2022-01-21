<img src="/static/v.png" align="right" />

# VidFlow

An open source content sharing platform (similar to YouTube).

Backend repo: [https://github.com/CryptoSingh1337/vidflow-backend](https://github.com/CryptoSingh1337/vidflow-backend)

[![Issues Closed](https://img.shields.io/github/issues-closed/CryptoSingh1337/vidflow-client?color=red)](https://github.com/CryptoSingh1337/vidflow-client/issues?q=is%3Aissue+is%3Aclosed)
[![Issues Open](https://img.shields.io/github/issues/CryptoSingh1337/vidflow-client?color=green)](https://github.com/CryptoSingh1337/vidflow-client/issues)
[![PRs Open](https://img.shields.io/github/issues-pr/CryptoSingh1337/vidflow-client)](https://github.com/CryptoSingh1337/vidflow-client/pulls)
![Last Commit](https://img.shields.io/github/last-commit/CryptoSingh1337/vidflow-client?color=informational)
![PRs Welcome](https://img.shields.io/badge/prs-welcome-ff69b4)
[![wakatime](https://wakatime.com/badge/github/CryptoSingh1337/vidflow-client.svg)](https://wakatime.com/badge/github/CryptoSingh1337/vidflow-client)

## Features

- Server side rendering
- Stunning and responsive UI
- Dark and light theme
- Material design
- JWT based user authentication
- Home page
- Trending page
- Subscriptions page
- History page
- Liked videos page
- Comment on videos
- Upload video page
- Your videos page
- Channel page
- Settings page

## Screenshots

#### Light theme
![light-theme](https://user-images.githubusercontent.com/56120837/150553448-6b781bd1-2930-4216-987b-b3ebb4eee510.png)

#### Landing page
![landing-page](https://user-images.githubusercontent.com/56120837/150551742-b3b301d4-cf4c-4e76-93cd-761ec5552754.png)

#### Landing page after login
![landing-page-after-login](https://user-images.githubusercontent.com/56120837/150552598-4ae46998-0a09-47a0-9a11-872f863df4b3.png)

#### Login/Signup page
![login/signup](https://user-images.githubusercontent.com/56120837/150552011-d01bd689-8650-41d8-9469-1406588fee4a.png)

#### Signup page
![signup](https://user-images.githubusercontent.com/56120837/150552140-82195317-2b7c-47e7-b28b-fd3fef448526.png)

#### Watch video page
![watch-video-page](https://user-images.githubusercontent.com/56120837/150552312-c842c44f-c138-4148-b36a-6bd1d6722dbf.png)

#### Video footer section
![video-footer-section](https://user-images.githubusercontent.com/56120837/150552469-ca3800ea-7994-49a1-8597-c32a5792bfbc.png)

#### Upload video page

##### Upload video
![upload-video-page](https://user-images.githubusercontent.com/56120837/150553809-e20d26d2-a774-4bcb-b23a-0688dde4a62b.png)

##### Add video metadata
![image](https://user-images.githubusercontent.com/56120837/150554236-2252ec9e-8afe-4dbc-b4d3-076283d48e91.png)

#### Channel page
![channel-page](https://user-images.githubusercontent.com/56120837/150552750-6d3247a6-7e6c-45c9-acb4-14e944bf3d67.png)

#### History page
![history-page](https://user-images.githubusercontent.com/56120837/150552900-db191775-59a0-4593-b548-a0ed7a1abd85.png)

#### Search page
![search-page](https://user-images.githubusercontent.com/56120837/150553052-e9112771-5267-45d1-8ad1-6b909acb12d7.png)

#### Your videos page
![your-videos-page](https://user-images.githubusercontent.com/56120837/150553232-33232171-8389-4d03-878c-58f7390ec4f5.png)

## TODO

- [ ] Like/dislike video functionality.
- [ ] Forgot password via email.
- [ ] Notifications functionality using redis as data store.
- [ ] Clear watch history after 21 days using Scheduling Tasks.

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

- **Frontend**:

  - JavaScript
  - Vue
  - Nuxt
  - Vuex
  - Vuex Router
  - Vuetify
  - **Deployment**:
    - Heroku

- **Backend**:
  - Java
  - Spring Boot
  - Spring Data Mongo
  - Spring Data Redis
  - Spring Security
  - Mircosoft Azure Blob Storage
  - **Deployment**:
    - Heroku
