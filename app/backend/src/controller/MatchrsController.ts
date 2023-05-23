import { Request, Response } from 'express';
import MatchersService from '../service/MatchesService';

export default class MatchesController {
  private _matchesService = new MatchersService();
  async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    try {
      if (!inProgress) return res.status(401).json({ message: 'Progress not found' });
      const { type, message } = (inProgress)
        ? await this._matchesService.getInProgress(inProgress as string)
        : await this._matchesService.getAll();
      return res.status(type).json(message);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async postMatches(req: Request, res: Response): Promise<Response> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    try {
      const { type, message } = await this._matchesService
        .postMatches(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
      return res.status(type).json(message);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async patchMatchesId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const { type, message } = await this._matchesService.patchMatchesId(Number(id));
      return res.status(type).json(message);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async patchMatches(req: Request, res: Response): Promise<Response> {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    try {
      const { type, message } = await this._matchesService
        .patchMatches(homeTeamGoals, awayTeamGoals, Number(id));
      return res.status(type).json(message);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
