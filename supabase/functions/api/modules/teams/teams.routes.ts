import { Hono } from '@hono/hono';
import { requireAuth } from '../../_shared/middleware/authentication.middleware.ts';
import teamsController from "./teams.controller.ts";
import { TEAMS_ROUTES } from "./constants/routes.constants.ts";

const teamsRouter = new Hono();

teamsRouter.post(TEAMS_ROUTES.ROOT, requireAuth, teamsController.create);
teamsRouter.post(TEAMS_ROUTES.JOIN, requireAuth, teamsController.join);
teamsRouter.patch(TEAMS_ROUTES.ROOT, requireAuth, teamsController.update);
teamsRouter.delete(TEAMS_ROUTES.ROOT, requireAuth, teamsController.delete);

export default teamsRouter;
