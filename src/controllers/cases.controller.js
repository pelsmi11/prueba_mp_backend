import CaseService from './../services/cases.service.js';

const service = new CaseService();


export const createCase = async (req, res, next) => {
  try{
    const body = req.body;
    const result = await service.create(body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getCases = async (req, res, next) => {
  try {
    const fiscals = await service.find();
    res.json(fiscals);
  } catch (error) {
    next(error);
  }
};

export const getCase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fiscal = await service.findOne(id);
    res.json(fiscal);
  }catch(error){
    next(error);
  }
};

export const updateCase = async(req, res, next) => {
  try{
    const {id}=req.params;
    const body = req.body;
    const result = await service.update(id,body);
    res.status(200).json(result);
  }catch(error){
    next(error);
  }
};

export const deleteCase = async (req, res, next) => {
  try{
    const {id}=req.params;
    const result = await service.delete(id);
    res.status(200).json(result);
  }catch(error){
    next(error);
  }
};
