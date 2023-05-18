// import Team from '../database/models/Teams';
import Team from '../database/models/Teams';
import Matchers from '../database/models/Matches';

export default class TeamsService {
  public getAll = async () => {
    const matchers = await Matchers.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return { type: 200, message: matchers };
  };

  public getInProgress = async (inProgress: string) => {
    const matchers = await Matchers.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return { type: 200, message: matchers };
  };
}
