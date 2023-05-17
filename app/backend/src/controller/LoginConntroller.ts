import { Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import Exception from '../error/Excepion';
import UserService from '../service/LoginService';

export default class UserController {
  private _userService = new UserService();

  async post(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const { type, message } = await this._userService.post(email, password);
      return res.status(type).json(message);
    } catch (error) {
      return res.status((error as Exception).status)
        .json({ message: (error as Exception).message });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { authorization } = req.headers;
      const { type, message } = await this._userService.get(authorization as string);
      return res.status(type).json(message);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return res.status(401)
          .json({ message: 'Token must be a valid token' });
      }
      return res.status((error as Exception).status)
        .json({ message: (error as Exception).message });
    }
  }
}
