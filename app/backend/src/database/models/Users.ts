import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Users extends Model {
  declare id: number;
  declare teamsName: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
  modelName: 'users',
});
