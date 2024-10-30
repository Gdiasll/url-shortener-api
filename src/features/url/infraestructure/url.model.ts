import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../core';
import User from '../../auth/infraestructure/user.model';

class Url extends Model {}

Url.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    visits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
      references: {
        model: User,
        key: 'id',
      }
    }
	},
	{
		sequelize,
    paranoid: true,
		modelName: 'Url',
		tableName: 'urls'
	}
);

export default Url;