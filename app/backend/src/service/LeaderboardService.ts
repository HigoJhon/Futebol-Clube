import { QueryTypes } from 'sequelize';
import db from '../database/models';

import getHome from './querys/getHome';
import getAway from './querys/getAway';

export default class LeaderboardService {
  public getHome = async () => {
    const leaderboard = await db.query(getHome, { type: QueryTypes.SELECT });
    return { type: 200, message: leaderboard };
  };

  public getAway = async () => {
    const leaderboard = await db.query(getAway, { type: QueryTypes.SELECT });
    return { type: 200, message: leaderboard };
  };
}
