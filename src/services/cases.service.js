import { notFound } from '@hapi/boom';
import  sequelize from './../libs/sequelize.js';
import boom from '@hapi/boom';
import pkg from './../libs/sequelize.js';

const { models } = pkg

class CaseService {
  constructor() {}

  async find() {
    const [results] = await sequelize.query(`
      EXEC ListCases
    `);
    return results;
  }

  async findOne(id) {
    const [results] = await sequelize.query(
      `EXEC GetCaseById @p_id=:id`,
      {
        replacements: { id },
      },
    );
    if (!results.length) {
      throw notFound('case not found');
    }
    return results[0];
  }

  async update(id, changes) {
    const caso = await this.findOne(id);
    const [results] = await sequelize.query(
      `EXEC UpdateCase @p_id=:id, @p_fiscalId=:fiscalId, @p_descrition=:description, @p_state=:state`,
      {
        replacements: {
          id,
          fiscalId: changes.fiscalId || caso.fiscalId,
          description: changes.description || caso.description,
          state: changes.state || caso.state
        },
      },
    );
    return results;
  }

  async create(data) {
    const [results] = await sequelize.query(
      `EXEC CreateCase @p_fiscalId=:fiscalId, @p_descrition=:description, @p_state=:state`,
      {
        replacements: {
          fiscalId: data.fiscalId,
          description: data.description,
          state: data.state
        },
      },
    );
    return results;
  }

  async delete(id) {
    await this.findOne(id);
    await sequelize.query(
      `EXEC DeleteCase @p_id=:id`,
      {
        replacements: { id },
      },
    );
    return { id };
  }
}

export default CaseService;
