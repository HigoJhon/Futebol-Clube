import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { verifyToken } from '../utils/JWT';
import Team from '../database/models/Teams';

const validMatch = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    if (!verifyToken(authorization)) throw new Error();
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
};

const validTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const homeTeam = await Team.findOne({ where: { id: homeTeamId } });
  const awayTeam = await Team.findOne({ where: { id: awayTeamId } });
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }
  if (!homeTeam || !awayTeam) {
    return res.status(404).json({
      message: 'There is no team with such id!' });
  }
  next();
};

export default { validMatch, validTeams };
