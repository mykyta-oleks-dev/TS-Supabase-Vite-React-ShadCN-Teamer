# Twitter-inspired Web Application

## Description

The client React application deployed with Vercel.

## Technologies used

-   TypeScript - a high-level, multi-paradigm programming language.

-   Node.JS - free, open-source, cross-platform JavaScript runtime environment.

-   npm - package manager for the JavaScript programming language maintained by npm, Inc., a subsidiary of GitHub.

-	Supabase - an open-source backend-as-a-service (BaaS) platform that simplifies app development by providing a suite of tools, including a Postgres database, user authentication, file storage, and serverless functions.

-   React - a free and open-source front-end JavaScript library for building user interfaces.

-   Vite - a build tool and development server for modern JavaScript projects, designed to provide a fast and lean development experience.

-	React Router - "A user‑obsessed, standards‑focused, multi‑strategy router".

-	TanStack Query - a library designed for managing server state in web applications

-	Zustand - "A small, fast, and scalable bearbones state management solution".

-	Shadcn - "A set of beautifully designed components that you can customize, extend, and build on."

## Structure and workflow

The client app uses Vite for serving the React app with the overall structure of directiories storing relevant code pieces to their field and names. The authentication is partially managed by the `api` (sign up, log in) and partially inside client app itself (using provided tokens from `api` or updating users passwords directly, sending reset messages etc.).

## Installation

The client app uses `npm` as the package manager.

```shell
npm install
```

## Running the project

The application connects to Supabase by creating client with provided env variables, as well as requests data from `api` Edge Function by axios fetches.

Run the script to start the app in development:

```shell
$ npm run dev
```

Set up the `.env.local` with variables as shown in `.env.example`. For deployment, create `.env.production` with the relevant publishable key and URLs.
