import Teams from '../database/models/Teams';

export default class TeamsService {
  public getAll = async () => {
    const teams = await Teams.findAll();
    return { type: 200, message: teams };
  };

  public getById = async (id: number) => {
    const team = await Teams.findByPk(id);
    return { type: 200, message: team };
  };
}
