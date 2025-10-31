import { Hono } from "@hono/hono";
import usersController from "./users.controller.ts";

const usersRouter = new Hono();

usersRouter.post('sign-up', usersController.signUp);

export default usersRouter;
