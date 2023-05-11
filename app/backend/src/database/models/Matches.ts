import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Metches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGals: number;
  declare awayTeam: number;
  declare awayTeamGals: number;
  declare inProgress: boolean;
}

Metches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_gals',
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamGals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_gals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
  modelName: 'metches',
});
