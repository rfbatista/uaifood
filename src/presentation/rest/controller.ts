import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';

const validateRoute = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation): unknown => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  };
};

export { validateRoute };
