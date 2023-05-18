import { Request, Response } from 'express';
import MatchersService from '../service/MatchesService';

export default class MatchesController {
  private _matchesService = new MatchersService();
  async getAll(_req: Request, res: Response): Promise<Response> {
    // try {
    const { type, message } = await this._matchesService.getAll();
    console.log('cheguei na controller assim:', message);
    return res.status(type).json(message);
    // } catch (error) {
    //   return res.status(500).json({ message: 'internal error' });
    // }
  }
}
