import { Model, DataTypes, Sequelize } from 'sequelize';

import { USER_TABLE } from './user.model.js';

export const FISCAL_TABLE = 'fiscals';

export const FiscalSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'name',
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'phone',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

export class Fiscal extends Model {

  static associate(models) {
    this.belongsTo(models.User, {as: 'user', foreignKey: 'userId'});
    this.hasMany(models.Case, {
      as: 'case',
      foreignKey: 'fiscalId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FISCAL_TABLE,
      modelName: 'Fiscal',
      timestamps: false
    }
  }
}
