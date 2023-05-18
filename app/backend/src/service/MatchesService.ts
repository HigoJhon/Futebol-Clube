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
    // console.log('cheguei no service assim:', matchers);
    return { type: 200, message: matchers };
  };
}
