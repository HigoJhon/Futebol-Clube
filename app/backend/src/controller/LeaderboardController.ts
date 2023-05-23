import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';

export default class LeaderboardController {
  private _leaderboardService = new LeaderboardService();
  async getHomeTeam(req: Request, res: Response): Promise<Response> {
    try {
      const { type, message } = await this._leaderboardService.getAll('homeTeamId');
      return res.status(type).json(message);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async getAwayTeam(req: Request, res: Response): Promise<Response> {
    try {
      const { type, message } = await this._leaderboardService.getAll('awayTeamId');
      return res.status(type).json(message);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async getTable(req: Request, res: Response): Promise<Response> {
    try {
      const { type, message } = await this._leaderboardService.getTable();
      return res.status(type).json(message);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
