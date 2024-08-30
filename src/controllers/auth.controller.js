import AuthService from './../services/auth.service.js';

const service = new AuthService();

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service.getUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    res.json(service.signToken(user));
  } catch (error) {
    next(error);
  }
};

export const signUp = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await service.create(body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const recovery = async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await service.setRecovery(email);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const response = await service.changePassword(token, newPassword);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const verifyToken = async (req, res, next) => {

    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const userFound = await service.verifyToken(token);
      return res.json({
        'id': userFound.id,
        'email': userFound.email,
        'role':userFound.role,
        'fiscal_id':userFound.fiscal_id,
        'fiscal_name':userFound.fiscal_name
      });
};
