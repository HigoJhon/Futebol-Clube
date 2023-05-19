import { Router } from 'express';
import MatchesController from '../controller/MatchrsController';
// import validMatch from '../middlewares/validMatchrs';
import validMatchrs from '../middlewares/validMatchrs';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', validMatchrs.validMatch, matchesController.getAll.bind(matchesController));
matchesRouter.post(
  '/',
  validMatchrs.validMatch,
  validMatchrs.validTeams,
  matchesController.postMatches.bind(matchesController),
);
matchesRouter.patch(
  '/:id/finish',
  validMatchrs.validMatch,
  matchesController.patchMatchesId.bind(matchesController),
);
matchesRouter.patch(
  '/:id',
  validMatchrs.validMatch,
  matchesController.patchMatches.bind(matchesController),
);

export default matchesRouter;
