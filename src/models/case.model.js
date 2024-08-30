import { Model, DataTypes, Sequelize } from 'sequelize';
import { FISCAL_TABLE } from './fiscal.model.js';

export const CASE_TABLE = 'cases';

export const CaseSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  fiscalId: {
    field: 'fiscal_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: FISCAL_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'description',
  },
  state: {
    allowNull: false,
    type: DataTypes.ENUM('terminado', 'en proceso'),
    defaultValue: 'en proceso'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
}


export class Case extends Model {
  static associate(models) {
    this.belongsTo(models.Fiscal, {
      as: 'fiscal',
      foreignKey: 'fiscalId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CASE_TABLE,
      modelName: 'Case',
      timestamps: false
    }
  }
}
