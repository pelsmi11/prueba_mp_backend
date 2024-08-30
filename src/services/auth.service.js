import UserService from './user.service.js';
import { unauthorized, serverUnavailable } from '@hapi/boom';
import bcrypt from 'bcryptjs';
import boom from '@hapi/boom';
import sequelize from './../libs/sequelize.js';
import pkg from 'jsonwebtoken';
import { config } from './../config/config.cjs';
import { createTransport } from 'nodemailer';
import jwt from 'jsonwebtoken';
import FiscalService from './fiscal.service.js';

const service = new UserService();
const fiscalService = new FiscalService();
const { sign, verify } = pkg;

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = sign(payload, config.jwtSecret, { expiresIn: '1h' });
    delete user.dataValues.recoveryToken;
    delete user.dataValues.password;
    return {
      user,
      token,
    };
  }

  async create(data) {
    const user = await service.findByEmail(data.email);
    if (user) {
      throw boom.conflict('El email ya se encuentra registrado');
    }
    const hash = await bcrypt.hash(data.password, 10);
    const [results] = await sequelize.query(
      `EXEC CreateUser @p_email=:email, @p_password=:password, @p_role=:role`,
      {
        replacements: {
          email: data.email,
          password: hash,
          role: data.role,
        },
      },
    );
    return results;
  }

  async setRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw unauthorized();
    }
    const payload = { sub: user.id };
    const token = sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `${config.urlFrontend}/change-password?token=${token}`;
    await service.updateRecoveryTokenAndPassword(user.id, token);
    const mail = {
      from: config.sender, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para recuperar contraseña', // Subject line
      html: `<b>Ingresa a este link para recuperar tu contraseña => <a href="${link}">${link}</a></b>`, // html body
    };
    const response = await this.sendMail(mail);
    return response;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = verify(token, config.jwtSecret);
      const user = await service.findByPk(payload.sub);
      if (user.recoveryToken !== token) {
        throw unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.updateRecoveryTokenAndPassword(user.id, null, hash);
      return { message: 'password changed' };
    } catch (error) {
      throw unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = createTransport({
      host: config.mailHost,
      port: config.mailPort,
      secure: false, //true for 465, false for other ports
      auth: {
        user: config.mailUser,
        pass: config.mailPassword,
      },
    });
    try {
      const message = await transporter.sendMail(infoMail);
      return { message, state: 'mail sent' };
    } catch (err) {
      throw serverUnavailable();
    }
  }

  async verifyToken(token) {
    try {
      // Envuelve jwt.verify en una promesa
      const user = await new Promise((resolve, reject) => {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
          if (err) {
            return reject(new Error('Unauthorized'));
          }
          resolve(decoded);
        });
      });

      const userFound = await service.findOne(user.sub);
      if (!userFound) {
        throw new Error('Unauthorized');
      }

      const fiscal = await fiscalService.findFiscalByUserId(userFound.id);

      userFound.fiscal_id = fiscal ? fiscal.id : null;
      userFound.fiscal_name = fiscal ? fiscal.name : null;

      return userFound;
    } catch (error) {
      throw new Error('Unauthorized');
    }
  }
}

export default AuthService;
