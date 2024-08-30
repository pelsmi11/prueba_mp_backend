import { ValidationError } from 'sequelize';

export function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

export function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    if (!res.headersSent) {
      res.status(output.statusCode).json(output.payload);
    } else {
      next(err);
    }
  }
}

export function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    if (!res.headersSent) {
      res.status(409).json({
        statusCode: 409,
        message: err.name,
        errors: err.errors,
      });
    }
  } else {
    next(err);
  }
}
