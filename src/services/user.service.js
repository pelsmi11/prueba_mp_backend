import { notFound } from '@hapi/boom';
import sequelize from './../libs/sequelize.js';
import pkg from './../libs/sequelize.js';
import bcrypt from 'bcryptjs';

const { models } = pkg;

class UserService {
  constructor() {}

  async find() {
    const [results] = await sequelize.query(`
      EXEC ListUsers
    `);
    return results;
  }

  async findOne(id) {
    const [results] = await sequelize.query(`EXEC GetUserById @id=:id`, {
      replacements: { id },
    });
    if (!results.length) {
      throw notFound('user not found');
    }
    return results[0];
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    let hash;

    if (changes.password) {
      hash = await bcrypt.hash(changes.password, 10);
    }else{
      hash = user.password;
    }

    const [results] = await sequelize.query(
      `EXEC UpdateUser @p_id=:id, @p_email=:email, @p_password=:password, @p_role=:role`,
      {
        replacements: {
          id,
          email: changes.email || user.email,
          password: hash,
          role: changes.role || user.role,
        },
      },
    );
    return results;
  }

  async delete(id) {
    await this.findOne(id); // Ensure user exists
    await sequelize.query(`EXEC DeleteUser @p_id=:id`, {
      replacements: { id },
    });
    return { id };
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email },
      include: [
        {
          model: models.Fiscal,
          as: 'fiscal',
          required: false,
        },
      ],
    });
    return rta;
  }

  async findByPk(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async updateRecoveryTokenAndPassword(userId, token, newPassword) {
    try {
      const user = await models.User.findByPk(userId);
      if (!user) {
        throw notFound('User not found');
      }
      if (newPassword) {
        user.password = newPassword;
      }
      user.recoveryToken = token;
      await user.save();
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
