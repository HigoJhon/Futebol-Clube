import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';

export default class LeaderboardController {
  private _leaderboardService = new LeaderboardService();
  async getHomeTeam(req: Request, res: Response): Promise<Response> {
    try {
      const { type, message } = await this._leaderboardService.getHome();
      return res.status(type).json(message);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async getAwayTeam(req: Request, res: Response): Promise<Response> {
    try {
      const { type, message } = await this._leaderboardService.getAway();
      return res.status(type).json(message);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async getTable(req: Request, res: Response): Promise<Response> {
    try {
      const { type, message } = await this._leaderboardService.getAll();
      return res.status(type).json(message);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
