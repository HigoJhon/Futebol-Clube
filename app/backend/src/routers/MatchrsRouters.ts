import { Router } from 'express';
import MatchesController from '../controller/MatchrsController';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAll.bind(matchesController));

export default matchesRouter;
