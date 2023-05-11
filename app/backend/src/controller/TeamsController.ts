import { Request, Response } from 'express';
import TeamsService from '../service/TeamsService';

export default class TeamsController {
  private _teamsService = new TeamsService();
  async getAll(_req: Request, res: Response): Promise<void> {
    const { type, message } = await this._teamsService.getAll();
    res.status(type).json(message);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { type, message } = await this._teamsService.getById(Number(id));
    res.status(type).json(message);
  }
}
