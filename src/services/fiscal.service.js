import { notFound } from '@hapi/boom';
import  sequelize from './../libs/sequelize.js';
import boom from '@hapi/boom';
import pkg from './../libs/sequelize.js';

const { models } = pkg

class FiscalService {
  constructor() {}

  async find() {
    const [results] = await sequelize.query(`
      EXEC ListFiscals
    `);
    return results;
  }

  async findOne(id) {
    const [results] = await sequelize.query(
      `EXEC GetFiscalById @p_id=:id`,
      {
        replacements: { id },
      },
    );
    if (!results.length) {
      throw notFound('fiscal not found');
    }
    return results[0];
  }

  async update(id, changes) {
    const fiscal = await this.findOne(id);
    const [results] = await sequelize.query(
      `EXEC UpdateFiscal  @p_id=:id, @p_name=:name, @p_lastName=:lastName, @p_phone=:phone, @p_userId=:userId`,
      {
        replacements: {
          id,
          name: changes.name || fiscal.name,
          lastName: changes.lastName || fiscal.lastName,
          phone: changes.phone || fiscal.phone,
          userId: changes.userId || fiscal.userId
        },
      },
    );
    return results;
  }

  async create(data) {
    const fiscal = await this.findFiscalByUserId(data.userId);
    const user = await models.User.findByPk(data.userId);
    if(fiscal){
      throw boom.conflict("El usuario ya tiene un perfil de fiscal");
    }
    if(!user){
      throw boom.conflict("El usuario no existe");
    }
    const [results] = await sequelize.query(
      `EXEC CreateFiscal @p_name=:name, @p_lastName=:lastName, @p_phone=:phone, @p_userId=:userId`,
      {
        replacements: {
          name: data.name,
          lastName: data.lastName,
          phone: data.phone,
          userId: data.userId
        },
      },
    );
    return results;
  }

  async delete(id) {
    await this.findOne(id);
    await sequelize.query(
      `EXEC DeleteUser @p_id=:id`,
      {
        replacements: { id },
      },
    );
    return { id };
  }

  async findFiscalByUserId(id){
    const res = await models.Fiscal.findOne({
      where: { userId: id }
    });
    return res;
  }
}



export default FiscalService;
