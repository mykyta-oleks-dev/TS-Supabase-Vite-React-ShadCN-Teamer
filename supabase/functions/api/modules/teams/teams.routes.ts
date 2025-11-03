import { Hono } from '@hono/hono';
import { requireAuth } from '../../_shared/middleware/authentication.middleware.ts';
import teamsController from "./teams.controller.ts";
import { TEAMS_ROUTES } from "./constants/routes.constants.ts";

const teamsRouter = new Hono();

teamsRouter.post(TEAMS_ROUTES.ROOT, requireAuth, teamsController.create);

export default teamsRouter;
