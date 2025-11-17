# Teamwide-collaborative Products Management Web Application

## Description

The fullstack web application of a team-based products management website. Based on Supabase, the application is divided into an API deployed as Supabase Edge Functions and a React client static application deployed with Vercel.

## Technologies used

-   TypeScript - a high-level, multi-paradigm programming language.

-   Node.JS - free, open-source, cross-platform JavaScript runtime environment.

-   npm - package manager for the JavaScript programming language maintained by npm, Inc., a subsidiary of GitHub.

-	Supabase - an open-source backend-as-a-service (BaaS) platform that simplifies app development by providing a suite of tools, including a Postgres database, user authentication, file storage, and serverless functions.

-	Hono - "a small, simple, and ultrafast web framework built on Web Standards".

-	Ethereal Email - a free, fake SMTP service used by developers to test sending emails without actually delivering them. Used in the demo purposes and easy to switch for commercial deployments.

-   React - a free and open-source front-end JavaScript library for building user interfaces.

-   Vite - a build tool and development server for modern JavaScript projects, designed to provide a fast and lean development experience.

-	React Router - "A user‑obsessed, standards‑focused, multi‑strategy router".

-	TanStack Query - a library designed for managing server state in web applications

-	Zustand - "A small, fast, and scalable bearbones state management solution".

-	Shadcn - "A set of beautifully designed components that you can customize, extend, and build on."

## Structure and workflow

The project consists of `supabase` directory with Edge Functions app (`api`), migrations and `client` Vite+React app.

Locally, the Supabase Edge Function `api` uses docker containers and uses Deno for serving Hono application for managing HTTP requests.

## Installation

The client app uses `npm` as the package manager.
The Supabase Edge Function uses Deno for dependancies and packages management.

Go to corresponding app's folders to learn more from their `README.md`s.

## Running the project

Refer to the apps' inner `README.md`-s for running them in development mode (with emulations).

## Features

-	Credentials Authentication: In order to use application, authentication is required. Users shall sign up in the system, followed by verifying the email with the link sent to them (at this point using mock Ethereal SMTP Server).

-	Google Authentication: Alternatively, users can use their Google accounts to authenticate in the system.

-	Profile creation: After successful authentication, new users have to set up their profile with necessary information, such as their full name, avatar and optional bio.

-	Joining or Creating team: The last step requires to either join the team by its code (shared by team leaders) or create their own team.

-	Home Page: Here users can see brief information about the team, such as its name, active users, count of products created etc. The list of all team members can be switched to be shown after clicking the corresponding button.

-	Realtime Online users: In the navigation menu on header (depending on the device sizes) you can see all team members that are currently online on the site (max 3 on side-menu, max 10 in small devices header). The team members displays online users with green circle and inactive - with gray.

-	Products table: Users can view the products of the team with pagination, filtering and full-text search, as well as perform basic status action, such as publish product, delete or set back in drafts.

-	Product details View and Edit: Navigate to the products from table to view the public details of product or edit them.

-	Profile details View and Edit: From home page, navigate to the user from the list to see their public info, or to your own profile from navigation menu. Edit your own profile's public information, including avatar.

-	Row-Level Security: Access to the DB tables is secured with RLS-s, limiting the access to teams' users access, non-active products etc. for anon users and users from separate teams.
