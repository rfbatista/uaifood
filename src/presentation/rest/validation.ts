import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validateRoute = (validations: ValidationChain[]) => {
  return async (req: Request<any, any, any, any, any>, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  };
};
