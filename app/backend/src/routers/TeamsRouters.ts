import { Router } from 'express';
import TeamsController from '../controller/TeamsController';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get('/', teamsController.getAll.bind(teamsController));
teamsRouter.get('/:id', teamsController.getById.bind(teamsController));

export default teamsRouter;
