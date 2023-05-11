import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Team extends Model {
  declare id: number;
  declare teamsName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
  modelName: 'team',
});
