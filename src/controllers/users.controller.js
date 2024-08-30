import UserService from './../services/user.service.js';

const service = new UserService();

export const getUsers = async (req, res, next) => {
  try {
    const users = await service.find();
    for (let user of users) {
      delete user.password;
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req,res,next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    delete user.password;
    res.json(user);
  }catch(error){
    next(error);
  }
}

export const updateUser = async (req,res,next)=>{
  try{
    const {id}=req.params;
    const body = req.body;
    const result = await service.update(id,body);
    res.status(200).json(result);
  }catch(error){
    next(error);
  }
}

export const deleteUser = async(req,res,next)=>{
  try{
    const {id}=req.params;
    const result = await service.delete(id);
    res.status(200).json(result);
  }catch(error){
    next(error);
  }
}

