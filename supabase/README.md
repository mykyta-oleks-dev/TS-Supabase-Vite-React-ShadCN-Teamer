# Twitter-inspired Web Application

## Description

A Supabase project configurations, migrations and function definition with Hono web app.

## Technologies used

-   TypeScript - a high-level, multi-paradigm programming language.

-   Node.JS - free, open-source, cross-platform JavaScript runtime environment.

-   npm - package manager for the JavaScript programming language maintained by npm, Inc., a subsidiary of GitHub.

-	Supabase - an open-source backend-as-a-service (BaaS) platform that simplifies app development by providing a suite of tools, including a Postgres database, user authentication, file storage, and serverless functions.

-	Hono - "a small, simple, and ultrafast web framework built on Web Standards".

-	Ethereal Email - a free, fake SMTP service used by developers to test sending emails without actually delivering them. Used in the demo purposes and easy to switch for commercial deployments.

## Structure and workflow

The `supabase` directory consists of `migrations/`, storing all the SQL DB migrations, `config.toml` for local development and `functions/api/` Edge Function, that serves data on HTTP requests with validations, authentication and authorization.

## Installation

The `api` Edge Function uses Deno for managing packages and their dependancies, as described in `deno.json`. No direct installation is required as the necessary packages will be cached or accessed via the URLs on demand.

## Running the project

The Supabase function requires installed Docker (Docker Desktop for Windows) and local containers set up, DB tables generated from migrations, as well as functions served to be able to process HTTP requests.

```shell
npx supabase start

npx supabase db reset

npx supabase functions serve
```
