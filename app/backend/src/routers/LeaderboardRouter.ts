import { Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

// leaderboardRouter.get('/', leaderboardController.getTable.bind(leaderboardController));
leaderboardRouter.get('/home', leaderboardController.getHomeTeam.bind(leaderboardController));
leaderboardRouter.get('/away', leaderboardController.getAwayTeam.bind(leaderboardController));

export default leaderboardRouter;
