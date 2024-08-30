import { User, UserSchema } from './user.model.js';
import { Fiscal, FiscalSchema } from './fiscal.model.js';
import { Case, CaseSchema } from './case.model.js';

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Fiscal.init(FiscalSchema, Fiscal.config(sequelize));
  Case.init(CaseSchema, Case.config(sequelize));

  User.associate(sequelize.models);
  Fiscal.associate(sequelize.models);
  Case.associate(sequelize.models);
}

export default setupModels;
