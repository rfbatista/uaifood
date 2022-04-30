import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFoundHanlder = (req: Request, res: Response, next: NextFunction) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: 'resource-not-found',
  });
};

export { notFoundHanlder };
