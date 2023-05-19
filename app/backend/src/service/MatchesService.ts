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

  public postMatches = async (
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    const match = await Matchers
      .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true });
    return { type: 201, message: match };
  };

  public patchMatchesId = async (id: number) => {
    await Matchers.update({ inProgress: false }, { where: { id } });
    return { type: 200, message: { message: 'Finished' } };
  };

  public patchMatches = async (homeTeamGoals: number, awayTeamGoals: string, id: number) => {
    await Matchers.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { type: 200, message: 'Updated' };
  };
}
