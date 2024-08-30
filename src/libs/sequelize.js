import { Sequelize } from 'sequelize';

import { config } from './../config/config.cjs';
import setupModels from '../models/index.js';

const options = {
  dialect: 'mssql',
  logging: console.log,
}

if (config.env == 'prod') {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

export default sequelize;
