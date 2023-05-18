import { Request, Response } from 'express';
import MatchersService from '../service/MatchesService';

export default class MatchesController {
  private _matchesService = new MatchersService();
  async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    try {
      const { type, message } = (inProgress)
        ? await this._matchesService.getInProgress(inProgress as string)
        : await this._matchesService.getAll();
      return res.status(type).json(message);
    } catch (error) {
      return res.status(500).json({ message: 'internal error' });
    }
  }
}
